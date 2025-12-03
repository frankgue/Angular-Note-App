import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { Note } from '../note/note.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private fireStore: Firestore) { }

  // Add New Note 
  addNote(note: Note){
    note.id = doc(collection(this.fireStore, 'id')).id;
    return addDoc(collection(this.fireStore, 'Notes'), note);
  }

  // Get All Notes From DB 
  getNotes(): Observable<Note[]> {
    let notesRef = collection(this.fireStore, 'Notes');
    return collectionData(notesRef, {idField: 'id'}) as Observable<Note[]>;
  }

  // Delete Note From DB 
 deleteNote(note: Note){
  const docRef = doc(this.fireStore, `Notes/${note.id}`);
  return deleteDoc(docRef);
}


  // Update Note from DB 
 updateNote(noteID: Note, notes: any) {
  if (!noteID) {
    throw new Error("Impossible d’update : l'ID de la note est manquant !");
  }

  const docRef = doc(this.fireStore, `Notes/${noteID}`);
  return updateDoc(docRef, notes);
}

}
