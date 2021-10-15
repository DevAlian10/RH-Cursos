import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Curso } from '../model/curso';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    cursos: any[] = [];

    constructor(private afStore: AngularFirestore) { }

    createId(){
        return this.afStore.createId();
    }

    registerCourse(curso: Curso) {
        return this.afStore.collection('Cursos').doc(curso.id).set(curso);
    }

    retrieveCurso(id:string){
        return this.afStore.collection<any>('Cursos').doc(id).valueChanges();
    }

    getCursos(){

        return this.afStore.collection('Cursos').valueChanges();
    }

    getAllCursos(id: string){
        return this.afStore.collection<any>('Cursos', ref => ref.where("idUser", "==", id).orderBy("fecha", "desc")).valueChanges();
    }

    updateCourse(curso: Curso){
        return this.afStore.collection<Curso>('Cursos').doc(curso.id).update(curso);
    }

    deleteCurso(id: string){
        return this.afStore.collection<any>('Cursos').doc(id).delete();
    }

    /* getUser(id: string) {
        return this.afs.collection<User>('User').doc(id).valueChanges();
    } */
}
