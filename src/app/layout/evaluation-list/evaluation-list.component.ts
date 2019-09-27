import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Evaluation } from '../../domain/evaluation.domain';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { EvaluationService } from 'src/app/services/evaluation.service';

@Component({
  selector: 'app-evaluation-list',
  templateUrl: './evaluation-list.component.html',
  styleUrls: ['./evaluation-list.component.css']
})
export class EvaluationListComponent implements OnInit {

  totalRecords: number;
  loading: boolean;

  nroFilasPorPagina= 5;
  paginaActual = 1;

  evaluations: Observable<Evaluation[]>;
  cols: any[];
  options: any[];

  constructor(private evaluationService: EvaluationService, private router: Router) { }

  ngOnInit() {
    this.cols = [
      { field: 'score', header: 'Score', isSort: false },
      { field: 'teacher', header: 'Teacher', isSort: false },
      { field: 'student', header: 'Student', isSort: false }
    ];

    this.options = [2, 4, 10, 25, 50, 100];

    this.loadEvaluations();
  }

  changeItemsPerPage(size) {
    this.nroFilasPorPagina = size;
    this.loadEvaluations();
  }

  loadEvaluations() {
    this.loading = true;
    this.evaluationService.findAllEvaluationPaginate(this.paginaActual,
                                          this.nroFilasPorPagina)
                        .subscribe(evaluationData => {
      this.evaluations = evaluationData.data;
      this.totalRecords =  evaluationData.total;
      this.loading = false;
    }, error => {
      console.info('no puedo traer evaluations');
      this.loading = false;
    });
  }

  loadEvaluationLazy(event: LazyLoadEvent) {
    if (event.first === 0) {
      this.paginaActual = 1;
    } else {
      this.paginaActual = event.first / this.nroFilasPorPagina;
      this.paginaActual++;
    }

    this.loadEvaluations();
  }


}
