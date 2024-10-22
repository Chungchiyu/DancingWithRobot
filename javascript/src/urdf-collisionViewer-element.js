import URDFManipulator from './urdf-manipulator-element.js';
import * as THREE from 'three';

export default class CollisionViewer extends URDFManipulator {
    constructor() {
        super();
        
        this.collisionMeshes = new Map();
        this.colliderIds = new Map();
        this.showCollisions = true;

        this.collisionMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            transparent: true,
            opacity: 0.5,
            wireframe: true
        });

        this.collisionRangeMaterial = new THREE.MeshBasicMaterial({
            color: 0xffff00,
            transparent: true,
            opacity: 0.3
        });

        this.axisRangeMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.2
        });

        this.collisionRanges = new Map();
        this.axisRanges = new Map();

        this.collidableMeshList = [];

        this.addEventListener('urdf-processed', () => {
            this.setupColliders();
        });
    }

    setupColliders() {
        if (!this.robot) {
            console.warn('Robot not loaded');
            return;
        }

        this.collisionMeshes.forEach(mesh => this.scene.remove(mesh));
        this.collisionMeshes.clear();
        this.colliderIds.clear();
        this.collidableMeshList = [];

        let colliderId = 0;
        this.robot.traverse(node => {
            if (node.isURDFCollider) {
                this.createCollider(node, colliderId);
                this.colliderIds.set(node, colliderId);
                colliderId++;
            }
            if (node.isURDFJoint) {
                this.createAxisRange(node);
            }
        });

        console.log(`Colliders created: ${this.collisionMeshes.size}`);
    }

    createCollider(collider, id) {
        const visualNode = collider.children.find(child => child.isMesh);
        if (!visualNode || !visualNode.geometry) {
            console.warn('Collider does not contain a valid mesh:', collider);
            return;
        }

        const collisionMesh = new THREE.Mesh(visualNode.geometry.clone(), this.collisionMaterial);
        collisionMesh.position.copy(visualNode.position);
        collisionMesh.rotation.copy(visualNode.rotation);
        collisionMesh.scale.copy(visualNode.scale);
        collisionMesh.updateMatrix();
        collisionMesh.matrixAutoUpdate = false;

        collisionMesh.visible = this.showCollisions;

        this.scene.add(collisionMesh);
        this.collisionMeshes.set(id, collisionMesh);
        this.collidableMeshList.push(collisionMesh);
    }

    createAxisRange(joint) {
        const box = new THREE.Box3();
        joint.children.forEach(child => {
            if (child.isURDFLink) {
                box.expandByObject(child);
            }
        });

        const boxGeometry = new THREE.BoxGeometry(
            box.max.x - box.min.x,
            box.max.y - box.min.y,
            box.max.z - box.min.z
        );
        const rangeMesh = new THREE.Mesh(boxGeometry, this.axisRangeMaterial);
        
        rangeMesh.position.copy(box.getCenter(new THREE.Vector3()));
        rangeMesh.updateMatrix();
        rangeMesh.matrixAutoUpdate = false;

        this.scene.add(rangeMesh);
        this.axisRanges.set(joint, rangeMesh);
    }

    update() {
        super.redraw(); // Call the parent's redraw method
        this.updateColliderPositions();
        this.updateAxisRanges();
        this.checkCollisions();
        this.renderer.render(this.scene, this.camera);
    }

    updateColliderPositions() {
        this.collisionMeshes.forEach((mesh, id) => {
            const collider = this.getColliderById(id);
            if (collider) {
                collider.updateWorldMatrix(true, false);
                mesh.matrix.copy(collider.matrixWorld);
                mesh.updateMatrixWorld(true);
            }
        });
    }

    updateAxisRanges() {
        this.axisRanges.forEach((rangeMesh, joint) => {
            joint.updateWorldMatrix(true, false);
            rangeMesh.matrix.copy(joint.matrixWorld);
            rangeMesh.updateMatrixWorld(true);
        });
    }

    getColliderById(id) {
        for (const [collider, colliderId] of this.colliderIds) {
            if (colliderId === id) return collider;
        }
        return null;
    }

    checkCollisions() {
        this.collisionMeshes.forEach((mesh, id) => {
            const collider = this.getColliderById(id);
            if (collider) {
                this.checkCollisionForMesh(mesh);
            }
        });
    }

    checkCollisionForMesh(mesh) {
        const vertices = mesh.geometry.vertices || mesh.geometry.attributes.position.array;
        const vertexCount = vertices.length / 3;

        for (let i = 0; i < vertexCount; i++) {
            const vertexIndex = i * 3;
            const localVertex = new THREE.Vector3(
                vertices[vertexIndex],
                vertices[vertexIndex + 1],
                vertices[vertexIndex + 2]
            );

            const globalVertex = localVertex.applyMatrix4(mesh.matrixWorld);
            const directionVector = globalVertex.sub(mesh.position);

            const ray = new THREE.Raycaster(mesh.position, directionVector.normalize());
            const collisionResults = ray.intersectObjects(this.collidableMeshList.filter(obj => obj !== mesh));

            if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                this.handleCollision(mesh, collisionResults[0].object, collisionResults[0].point);
                return; // Exit after first collision detection
            }
        }

        this.resetCollisionHighlight(mesh);
    }

    handleCollision(meshA, meshB, collisionPoint) {
        this.highlightCollision(meshA);
        this.highlightCollision(meshB);
        this.showCollisionRange(meshA, meshB, collisionPoint);
        console.log(`Collision detected between meshes ${this.colliderIds.get(meshA)} and ${this.colliderIds.get(meshB)}`);
    }

    highlightCollision(mesh) {
        if (mesh) {
            mesh.material.color.setHex(0x00ff00);
            mesh.material.opacity = 0.8;
            mesh.material.needsUpdate = true;
        }
    }

    resetCollisionHighlight(mesh) {
        if (mesh) {
            mesh.material.color.setHex(0xff0000);
            mesh.material.opacity = 0.5;
            mesh.material.needsUpdate = true;
        }
    }

    showCollisionRange(meshA, meshB, collisionPoint) {
        const key = this.getCollisionKey(meshA, meshB);
        let rangeMesh = this.collisionRanges.get(key);

        if (!rangeMesh) {
            const geometry = new THREE.SphereGeometry(0.05, 32, 32);
            rangeMesh = new THREE.Mesh(geometry, this.collisionRangeMaterial);
            this.scene.add(rangeMesh);
            this.collisionRanges.set(key, rangeMesh);
        }

        rangeMesh.position.copy(collisionPoint);
        rangeMesh.visible = true;
    }

    removeCollisionRange(meshA, meshB) {
        const key = this.getCollisionKey(meshA, meshB);
        const rangeMesh = this.collisionRanges.get(key);
        if (rangeMesh) {
            rangeMesh.visible = false;
        }
    }

    getCollisionKey(meshA, meshB) {
        const idA = this.colliderIds.get(meshA);
        const idB = this.colliderIds.get(meshB);
        return `${Math.min(idA, idB)}-${Math.max(idA, idB)}`;
    }

    toggleCollisionVisualization(show) {
        this.showCollisions = show;
        this.collisionMeshes.forEach(mesh => {
            mesh.visible = show;
        });
        this.collisionRanges.forEach(mesh => {
            mesh.visible = show && mesh.visible;
        });
        this.axisRanges.forEach(mesh => {
            mesh.visible = show;
        });
    }
}