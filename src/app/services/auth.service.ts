import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../model/user';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    //Almacenar el usuario logueado
    loginUser: any;
    //Almacenar la data del Usuario desde la BD
    dataUser: any;
    //Inicializar el objeto de Usuario


    constructor(
        public afs: AngularFirestore, //Injectar Servicio Firestore
        public afAuth: AngularFireAuth, //Injectar Servicio de Autenticación Firebase
        public router: Router, //Sirve para el ruteo entre componentes
        public ngZone: NgZone //Permite tomar el control cuando se ha salido de la zona angular
    ) {
        /* Guardar los datos del usuario en localstorage cuando inicia Sesión y anularla cuando cierra Sesión */
        this.afAuth.authState.subscribe(async user => {
            if (user) {
                this.loginUser = user;
                localStorage.setItem('dataUser', JSON.stringify(this.loginUser));
                JSON.parse(localStorage.getItem('dataUser')!);
                (await this.getUser(user.uid)).subscribe(async res => {
                    this.dataUser = res?.id;
                    if (await res?.type === 'Administrador') {
                        this.router.navigate(['dashboard']);
                    }
                    else {
                        await this.router.navigate(['inicio']);
                    }
                });
            } else {
                localStorage.setItem('dataUser', null!);
                JSON.parse(localStorage.getItem('dataUser')!);
            }
        });
    }

    //Iniciar Sesión con correo y contrseña
    async signIn(email: string, password: string) {
        return this.afAuth.signInWithEmailAndPassword(email, password).then(async res => {
            if (res.user?.emailVerified === false) {
                /* this.ngZone.run(() => { */
                /* this.setUserData(res.user); */
                (await this.getUser(res.user?.uid!)).subscribe(async user => {
                    if (await user?.type == 'Administrador') {
                        alert('Hola Admin');
                        this.router.navigate(['dashboard']);
                    }
                    else {
                        await this.router.navigate(['inicio']);
                        alert('Hola User');
                    }
                });
                /* }); */
            } else {
                this.router.navigate(['/']);
                window.alert('Solicite acceso al Departamento de RH');
            }
        }).catch(error => {
            window.alert(error.message);
        });
    }

    //Registrarse con correo y contraseña
    register(user: User) {
        return this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
    }
    setDataUser(user: any) {
        return this.afs.collection('users/' + user.uid).add(user);
    }

    verificaitonEmail() {
        return this.afAuth.currentUser.then(res => {
            res!.sendEmailVerification().then(() => {
                window.alert('Se envio verificación de correo');
            });
        }).catch(error => {
            alert(error);
        });
    }

    //Recuperardata del Usuario logueado
    getUser(id: string) {
        return  this.afs.collection<User>('User').doc(id).valueChanges();
    }

    //Resetear password
    forgotPassword(email: string) {
        return this.afAuth.sendPasswordResetEmail(email).then(() => {
            window.alert('Se reestablecio su contraseña');
        }).catch(error => {
            window.alert(error);
        });
    }

    //Verificar cuando el Usuario se loquea y que el correo este verificado
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('dataUser')!);
        return (user !== null && user.emailVerified === false) ? true : false;
    }

    //Configurar los datos del usuario al iniciar sesión con nombre de usuario/contraseña, registrarse con nombre de usuario/contraseña e iniciar sesión con el proveedor de autenticación social en la base de datos Firestore usando el servicio AngularFirestore + AngularFirestoreDocument
    /* setUserData(user: any) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc("users/" + user.uid);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        };
        return userRef.set(userData, {
            merge: true
        });
    } */

    //Cerrar Sesión
    async signOut() {
        return await this.afAuth.signOut().then(async () => {
            await localStorage.removeItem('dataUser');
            await this.router.navigate(['/']);
        });
    }
}
