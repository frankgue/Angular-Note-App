import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../services/note.service';
import { Note } from './note.model';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-note',
  standalone: false,
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
})
export class NoteComponent implements OnInit {
  noteFormValue!: FormGroup;
  editFormValue!: FormGroup;
  noteId: any;
  noteDetails: any;
  allNotes: any = [];
  noteObj: Note = {
    id: '',
    note_title: '',
    note_desc: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    private noteService: NoteService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.noteFormValue = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.editFormValue = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });

    this.getAllNotes();
  }

  addNote() {
    const { value } = this.noteFormValue;
    console.log(value);
    this.noteObj.id = '';
    this.noteObj.note_title = value.title;
    this.noteObj.note_desc = value.description;

    this.noteService.addNote(this.noteObj).then((note) => {
      if (note) {
        alert('Note Add Successfully');
        this.noteFormValue.reset();
      } else {
      }
    });
  }

  getAllNotes() {
    this.spinner.show();
    this.noteService.getNotes().subscribe((res) => {
      this.allNotes = res;
        this.spinner.hide();
    });
  }

  deleteNote(note: Note) {
    let decision = confirm('Are you sure to delete this note ?');
    if (decision) {
      this.noteService.deleteNote(note);
      this.getAllNotes();
    }
  }

  updateNote(note: Note) {
    const { value } = this.editFormValue;
    console.log(value);
    this.noteObj.id = this.noteDetails.id;
    this.noteObj.note_title = value.title;
    this.noteObj.note_desc = value.description;
    console.log(this.noteObj);

    this.noteService.updateNote(this.noteDetails.id, this.noteObj).then(() => {
      alert('Note Updated Successfully');
    });
  }

  getAllDetails(note: Note) {
    this.noteDetails = note;
    this.editFormValue.patchValue({
      title: this.noteDetails?.note_title,
      description: this.noteDetails?.note_desc,
    });
  }
}
