import { AfterViewInit, Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message, MessageService } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { EvaluationService } from 'src/app/services/evaluation.service';
import { Evaluation } from  '../../domain/evaluation.domain';
import { User } from 'src/app/domain/user.domain';

@Component({
  selector: 'app-evaluations',
  templateUrl: './evaluations.component.html',
  styleUrls: ['./evaluations.component.css']
})
export class EvaluationsComponent implements OnInit {

  public evaluationForm: FormGroup;
  public evaluation: Evaluation = {};
  public students: User[];
  public teachers: User[];

  // Array FILTRADO de Opciones del Deplegable de Teachers
  public filterOptionsTeachers: any[];

  // Array FILTRADO de Opciones del Deplegable de Students
  public filterOptionsStudents: any[];

  constructor(private _fb: FormBuilder,
              private userService: UserService,
              private evaluationService: EvaluationService,
              private router: Router,
              private messageService: MessageService) { }

  ngOnInit() {

    this.evaluationForm = this._fb.group({
      score: [null, [Validators.required, Validators.minLength(1)]],
      teacher: [null, Validators.required],
      student: [null, Validators.required]
    });

    this.cargarTeachers();
    this.cargarStudents();

  }

  cargarTeachers() {
      this.userService.findAllUsers()
      .subscribe(usersData => {
        let usersTemp: User[] = usersData as User[];
        this.teachers = [];
        usersTemp.forEach(user => {
          if (user.role !== undefined && user.role === 'ROLE_TEACHER') {
            this.teachers.push(user);
          }
        });
      }, error => {
        console.info('no puedo traer usuarios');
      });
  }

  cargarStudents() {
    this.userService.findAllUsers()
    .subscribe(usersData => {
      let usersTemp: User[] = usersData as User[];
      this.students = [];
      usersTemp.forEach(user => {
        if (user.role !== undefined && user.role === 'ROLE_STUDENT') {
          this.students.push(user);
        }
      });
    }, error => {
      console.info('no puedo traer usuarios');
    });
  }
  cancelar() {
    this.evaluationForm.reset();
    this.router.navigate([`/evaluate-paginate`]);
  }

  guardar() {

    if (!this.evaluationForm.valid) {
        this.messageService.add({severity: 'warn', summary: 'Guardar', detail: 'Debe completar todos los campos'});
        return;
     }

    this.evaluation = this.evaluationForm.value;

    console.log(`guardar evaluation  ${this.evaluation.score} `);
    this.evaluationService.saveEvaluation(this.evaluation)
          .subscribe(
            (evaluation: Evaluation) => {
                this.messageService.add({ severity: 'info', summary: `Evaluation ${evaluation.id} save`, detail: evaluation.id.toString() });
                this.evaluation = {};
                this.router.navigate([`/evaluate-paginate`]);
            }, error => {
                this.router.navigate([`/evaluate-paginate`]);
                this.messageService.add({ severity: 'error', summary: `error in save evaluation  ${error}`, detail: error });
            });
  }

   /**
     * Filtra entre las opciones del componente en base a lo que va tipeando el usuario
     * @param event
     */
    filtrarTeachers(event) {
      this.filterOptionsTeachers = [];
      for(let i = 0; i < this.teachers.length; i++) {
          const option = this.teachers[i];

          // campo a concatenar para comparar
          const comparar:any = option['name'].toLowerCase();
          const query:any = event.query.toLowerCase();
          if(comparar.search(query) !== -1) {
              this.filterOptionsTeachers.push(option);
          }
      }
  }

   /**
     * Filtra entre las opciones del componente en base a lo que va tipeando el usuario
     * @param event
     */
    filtrarStudents(event) {
      this.filterOptionsStudents = [];
      for(let i = 0; i < this.students.length; i++) {
          const option = this.students[i];

          // campo a concatenar para comparar
          const comparar:any = option['name'].toLowerCase();
          const query:any = event.query.toLowerCase();
          if(comparar.search(query) !== -1) {
              this.filterOptionsStudents.push(option);
          }
      }
  }

}
