
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/compat/firestore";

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {


  constructor(private firestore: AngularFirestore) { }


  //Crea un nuevo dato   
  public crear(collection: string, data: any, id:string) {
    return this.firestore.collection(collection).doc(id).set(data);
  }

  public crear_evento(data: any) {
    return this.firestore.collection("events").add(data);
  }

  public leer_eventos(userid: string){
    return this.firestore.collection("events", ref=> ref.where('user','==',userid)).snapshotChanges();

  }

  public leer_subjects(userid: string){
    return this.firestore.collection("subjects", ref=> ref.where('user','==',userid)).snapshotChanges();

  }

  public obtenerPorId(coleccion: string, id: string) {
    return this.firestore.collection(coleccion).doc(id).snapshotChanges();
    // El documento que tenga ese id tal cual este ahora, le saca una foto y me lo devuelve
  }

  public obtenerTodos(coleccion: string) {
    return this.firestore.collection(coleccion).snapshotChanges();
  }

  public actualizar(coleccion: string, data: any, id: string) {
    return this.firestore.collection(coleccion).doc(id).set(data);
  }

  public eliminar(collection: string, id: string) {
    return this.firestore.collection(collection).doc(id).delete();
  }

  public createWithCustomId(collection: string, customId: string, data: any) {
    this.firestore.collection(collection).doc(customId).set(data);
  }

}