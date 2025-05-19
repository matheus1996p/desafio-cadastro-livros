-- Tabela LIVRO
CREATE TABLE livro (
    cod_livro SERIAL PRIMARY KEY,
    titulo VARCHAR(40) NOT NULL,
    editora VARCHAR(40),
    edicao INTEGER,
    ano_publicacao VARCHAR(4),
    valor NUMERIC(10,2)  
);

-- Tabela AUTOR
CREATE TABLE autor (
    cod_autor SERIAL PRIMARY KEY,
    nome VARCHAR(40) NOT NULL
);

-- Tabela ASSUNTO
CREATE TABLE assunto (
    cod_assunto SERIAL PRIMARY KEY,
    descricao VARCHAR(20) NOT NULL
);

-- Tabela de relação LIVRO_AUTOR (n:n)
CREATE TABLE livro_autor (
    cod_livro INTEGER NOT NULL,
    cod_autor INTEGER NOT NULL,
    PRIMARY KEY (cod_livro, cod_autor),
    FOREIGN KEY (cod_livro) REFERENCES livro(cod_livro),
    FOREIGN KEY (cod_autor) REFERENCES autor(cod_autor)
);

-- Tabela de relação LIVRO_ASSUNTO (n:n)
CREATE TABLE livro_assunto (
    cod_livro INTEGER NOT NULL,
    cod_assunto INTEGER NOT NULL,
    PRIMARY KEY (cod_livro, cod_assunto),
    FOREIGN KEY (cod_livro) REFERENCES livro(cod_livro),
    FOREIGN KEY (cod_assunto) REFERENCES assunto(cod_assunto)
);

CREATE OR REPLACE VIEW public.vw_relatorio_livros_autor
AS SELECT l.cod_livro,
    l.titulo,
    a.nome AS nome_autor,
    s.descricao,
    l.valor
   FROM livro l
     JOIN livro_autor la ON la.cod_livro = l.cod_livro
     JOIN autor a ON a.cod_autor = la.cod_autor
     LEFT JOIN livro_assunto ls ON ls.cod_livro = l.cod_livro
     LEFT JOIN assunto s ON s.cod_assunto = ls.cod_assunto;