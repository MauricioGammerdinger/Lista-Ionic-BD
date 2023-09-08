import { Component } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Tarefa } from './modelo/check.model';
import { JsonPipe } from '@angular/common';
@Component({
  selector: 'app-check',
  templateUrl: './check.page.html',
  styleUrls: ['./check.page.scss'],
})
export class CheckPage{

    tarefas: Tarefa[] = [];
  alertController: any;
  
constructor(private alert: AlertController, private toastController: ToastController) {
  let storedData = localStorage.getItem('taskBD');
  if (storedData != null) {
    this.tarefas = JSON.parse(storedData);
  }
}
  
    async showAdd(){
      const screen = await this.alert.create({
        header: 'O que deseja fazer?',
        inputs: [
          {
            name: 'task',
            type: 'text',
            placeholder: 'O que deseja fazer...'
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {console.log('apagar a tarefa')}
          },
          {
            text: 'Adicionar',
            handler: (form) => {
                                  this.updateData(form);
                               }
          }
        ]
      });
  
      screen.present();
    }

    async showEdit(tarefa: Tarefa){
      const screen = await this.alert.create({
        header: 'Editar Tarefa',
        inputs: [
          {
            name: 'newTask',
            type: 'text',
            value: tarefa.descricao
          }
        ],
        buttons: [
          {
            text: 'Cancelar',
            handler: () => {console.log('editar a tarefa')}
          },
          {
            text: 'Salvar',
            handler: (form) => {
                                  tarefa.descricao = form.newTask;
                                  localStorage.setItem('taskBD', JSON.stringify(this.tarefas)); 
                                  this.showToast('Tarefa editada com sucesso!'); 
                               }
          }
        ]
      });
  
      screen.present(); 
    }


    async Delete (tarefa: Tarefa){
      const screen = await this.alert.create({
        header: 'Excluir Tarefa',
        message: 'Tem certeza que quer excluir essa tarefa?' ,
        buttons: [
          {
            text: 'Cancelar',
            role:'cancel'
          },
          {
            text: 'Excluir',
            handler: () => {      
                                  const excluir = this.tarefas.indexOf(tarefa);
                                  if(excluir !== -1) {
                                    this.tarefas.splice(excluir, 1);
                                  localStorage.setItem('taskBD', JSON.stringify(this.tarefas)); 
                                  this.showToast('Tarefa excluída com sucesso!'); 
                                }
                               }
                            }
                          ]
                        });
  
      screen.present(); 
    }

    updateData(form: any){
      if(!form.task || form.task.trim() == ''){
        this.showToast(`A tarefa precisa ser preenchida`);
        return;
        
      }

      let obj = {id: this.getId(this.tarefas), 
                 descricao: form.task, 
                 status: false};

      this.tarefas.push(obj);

      localStorage.setItem('taskBD', JSON.stringify(this.tarefas)); 
    }
  
    getId(dados: Tarefa[]): number {
      let tamanho:number = (dados.length) + 1;

      return tamanho;
    }
  
    async showToast(mensagem: string){
      const toast = await this.toastController.create({
        message: mensagem,
        duration: 2000,
        position: 'bottom',
        cssClass: 'toast-config'
      });
  
      toast.present();
    }
  
    alterarStatus(tarefa: Tarefa){
      tarefa.status = !tarefa.status;
      localStorage.setItem('taskBD', JSON.stringify(this.tarefas)); 
    }
  }
  