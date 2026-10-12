import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutosService } from './services/produtos';
import { Produto } from './models/produto.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent implements OnInit {

  // Variáveis de estado de tela

  produtos: Produto[] = [];
  novoProduto: { nome: string; preco: number } = { nome: '', preco: 0 };

  buscaId: number | null = null;
  produtoEncontrado: Produto | null = null;

  produtoEmEdicao: Produto | null = null;

  constructor(private produtosService: ProdutosService, private cdr: ChangeDetectorRef) { }

  // Assim que a tela carregar, lista todos os produtos
  ngOnInit(): void {
    this.carregarProdutos();
  }

  // GET listar todos os produtos

  carregarProdutos() {
    this.produtosService.listarTodos().subscribe({
      next: (dados) => {
        this.produtos = dados;
        this.cdr.detectChanges();
      },
      error: (erro) => console.error('Erro ao carregar produtos:', erro)
    });  
  }

  // GET Buscar por ID

  buscarPorId() {
    if (!this.buscaId) return;
    this.produtosService.buscarPorId(this.buscaId).subscribe({
      next: (dados) => this.produtoEncontrado = dados,
      error: () => {
        alert('Produto não encontrado!');
        this.produtoEncontrado = null;
      }
    });
  }

  // POST Criar novo produto

  adicionar() {
    this.produtosService.criar(this.novoProduto).subscribe({
      next: () => {
        this.carregarProdutos(); // Recarrega a lista de produtos após adicionar
        this.novoProduto = { nome: '', preco: 0 }; // Limpa o formulário
      },
      error: (erro) => {
        console.error('Erro ao adicionar produto:', erro);
      }
    });
  }

  // DELETE - Remover
  
  remover(id: number) {
    this.produtosService.remover(id).subscribe({
      next: () => this.carregarProdutos(), // Recarrega a lista de produtos após remover
      error: (erro) => console.error('Erro ao remover produto:', erro)
    });
  }

 // Prepara a linha da tabela para edição
 
 iniciarEdicao(produto: Produto) {
  this.produtoEmEdicao = { ...produto }; // Cria uma cópia do produto para edição
 }

 // PUT - Atualizar produto

 salvarEdicao() {
  if (!this.produtoEmEdicao) return;

  const dadosAtualizados = {
    nome: this.produtoEmEdicao.nome,
    preco: this.produtoEmEdicao.preco
  };

  this.produtosService.atualizar(this.produtoEmEdicao.id, this.produtoEmEdicao).subscribe({
    next: () => {
      this.carregarProdutos(); // Recarrega a lista de produtos após atualizar
      this.produtoEmEdicao = null; // Limpa o estado de edição
    },
    error: (erro) => {
      // Se o status for 200, o back-end salvou com sucesso, apenas retornou vazio.
      if (erro.status === 200) {
        this.carregarProdutos(); // Recarrega a tabela
        this.produtoEmEdicao = null; // Fecha o modo de edição
      } else {
        console.error('Erro real ao atualizar produto:', erro);
      }
    }
  });
 }

}
