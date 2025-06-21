document.addEventListener('DOMContentLoaded', () => {
    const bookListElement = document.getElementById('bookList');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const addBookBtn = document.getElementById('addBookBtn');

    
    const detailsModal = document.getElementById('bookDetailsModal');
    const addEditModal = document.getElementById('addEditBookModal');
    const bookForm = document.getElementById('bookForm');
    const modalFormTitle = document.getElementById('modalFormTitle');

    let books = getBooksFromStorage();

    function getBooksFromStorage() {
        const storedBooks = localStorage.getItem('myBooks');
        if (storedBooks) {
            return JSON.parse(storedBooks);
        } else {
            return [
                {
                    id: 1,
                    titulo: "Rules for Romance",
                    autor: "Olivia Nadal",
                    anoPublicacao: 2021,
                    genero: "Romance",
                    isbn: "978-1234567890",
                    paginas: 280,
                    editora: "Editora Fictícia",
                    idioma: "Inglês", 
                    sinopse: "What not to do (and why I did it anyway). Uma comédia romântica sobre aprender as regras do amor, mesmo quebrando todas elas.",
                    notaUsuario: 3.0, 
                    dataAdicao: "2023-01-15",
                    capaUrl: "images/rules.jpg.png", 
                    resenhaUsuario: "Leitura leve e divertida, adorei os personagens!"
                },
                {
                    id: 2,
                    titulo: "Another Hot Summer",
                    autor: "Olivia Nadal",
                    anoPublicacao: 2019, 
                    genero: "Romance", 
                    isbn: "9783879349579", 
                    isbn10: "8973478841", 
                    paginas: 304, 
                    editora: "Versus", 
                    idioma: "Português", 
                    sinopse: "From the writer of Rules for Romance. Um verão quente cheio de reviravoltas e um novo amor.",
                    notaUsuario: 4.0, 
                    dataAdicao: "2022-04-12", 
                    capaUrl: "images/another.jpg.png", 
                    resenhaUsuario: "Gostei bastante, a química do casal é ótima."
                },
                {
                    id: 3,
                    titulo: "Starborn",
                    autor: "Cory LeBlanc",
                    anoPublicacao: 2020,
                    genero: "Fantasia",
                    isbn: "978-1122334455",
                    paginas: 450,
                    editora: "Galaxy Press",
                    idioma: "Inglês", 
                    sinopse: "Letters of the Scribe. An epic fantasy adventure across the stars.",
                    notaUsuario: 5.0, 
                    dataAdicao: "2023-03-20",
                    capaUrl: "images/starborn.jpg.png", 
                    resenhaUsuario: ""
                },
                 {
                    id: 4,
                    titulo: "Love Right Next Door",
                    autor: "Olivia Nadal",
                    anoPublicacao: 2022,
                    genero: "Romance",
                    isbn: "978-5544332211",
                    paginas: 310,
                    editora: "Heartfelt Books",
                    idioma: "Inglês", 
                    sinopse: "They were an unlikely pair. Uma história encantadora sobre encontrar o amor onde menos se espera.",
                    notaUsuario: 2.0, 
                    dataAdicao: "2023-05-10",
                    capaUrl: "images/love.jpg.png", 
                    resenhaUsuario: "Fofo, mas um pouco previsível."
                }
            ];
        }
    }

    function saveBooksToStorage() {
        localStorage.setItem('myBooks', JSON.stringify(books));
    }

    function renderBooks(booksToRender = books) {
        bookListElement.innerHTML = '';
        if (booksToRender.length === 0) {
            bookListElement.innerHTML = '<p class="no-books-message">Nenhum livro encontrado. Que tal adicionar alguns?</p>';
            return;
        }

        booksToRender.forEach(book => {
            const card = document.createElement('div');
            card.classList.add('book-card');
            card.dataset.id = book.id;

            const img = document.createElement('img');
            img.src = book.capaUrl || 'images/default_cover.png';
            img.alt = `Capa do livro ${book.titulo}`;

            const title = document.createElement('h3');
            title.textContent = book.titulo;

            const author = document.createElement('p');
            author.classList.add('author');
            author.textContent = book.autor;

            const ratingDivContainer = document.createElement('div'); 
            ratingDivContainer.classList.add('rating'); 

            const ratingStars = document.createElement('div');
            ratingStars.innerHTML = getStarRating(book.notaUsuario);
            ratingDivContainer.appendChild(ratingStars);


            const optionsBtn = document.createElement('button');
            optionsBtn.classList.add('options-btn');
            optionsBtn.dataset.id = book.id;
            optionsBtn.textContent = '...'; 
            optionsBtn.onclick = (e) => {
                e.stopPropagation();
                openDetailsModal(book.id);
            };

            card.appendChild(img);
            card.appendChild(title);
            card.appendChild(author);
            card.appendChild(ratingDivContainer); 
            card.appendChild(optionsBtn); 

            card.addEventListener('click', () => openDetailsModal(book.id));
            bookListElement.appendChild(card);
        });
    }

    function getStarRating(nota) {
        if (nota === null || nota === undefined || isNaN(nota)) return '<span>Sem nota</span>';
        const roundedNota = Math.round(nota * 2) / 2; 
        const fullStars = Math.floor(roundedNota);
        
        const emptyStars = 5 - fullStars; 
        
        let starsHTML = '';
        for (let i = 0; i < fullStars; i++) starsHTML += '<span class="star filled">★</span>';
        
        for (let i = 0; i < emptyStars; i++) starsHTML += '<span class="star">☆</span>';
        return starsHTML;
    }


    window.closeDetailsModal = function() {
        detailsModal.style.display = 'none';
    }
    window.closeAddEditModal = function() {
        addEditModal.style.display = 'none';
        bookForm.reset();
        document.getElementById('bookId').value = '';
    }

    window.onclick = function(event) {
        if (event.target == detailsModal) {
            closeDetailsModal();
        }
        if (event.target == addEditModal) {
            closeAddEditModal();
        }
    }
    
    window.openDetailsModalWithData = function(cardElement) {
        const bookId = cardElement.dataset.id;
        if (bookId) {
             openDetailsModal(parseInt(bookId));
        } else {
            
            
            const detailsModal = document.getElementById('bookDetailsModal');
            document.getElementById('modalBookCover').src = cardElement.querySelector('img').src;
            document.getElementById('modalBookTitle').textContent = cardElement.querySelector('h3').textContent;
            document.getElementById('modalBookAuthor').textContent = cardElement.querySelector('.author').textContent;
           
            document.getElementById('modalBookSynopsis').textContent = 'Detalhes não disponíveis para este item estático.';
            document.getElementById('modalBookRating').innerHTML = cardElement.querySelector('.rating').innerHTML;
            
            detailsModal.style.display = 'block';
        }
    };


    function openDetailsModal(bookId) {
        const book = books.find(b => b.id === parseInt(bookId));
        if (!book) return;

        document.getElementById('modalBookCover').src = book.capaUrl || 'images/default_cover.png';
        document.getElementById('modalBookCover').alt = `Capa de ${book.titulo}`;
        document.getElementById('modalBookTitle').textContent = book.titulo;
        document.getElementById('modalBookAuthor').textContent = book.autor; 
        document.getElementById('modalBookSynopsis').textContent = book.sinopse || 'Não disponível.';
        document.getElementById('modalBookRating').innerHTML = getStarRating(book.notaUsuario) + (book.notaUsuario !== null && book.notaUsuario !== undefined ? ` (${book.notaUsuario.toFixed(1)}/5)` : '');
        document.getElementById('modalBookDateAdded').textContent = book.dataAdicao ? new Date(book.dataAdicao + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'; 
        document.getElementById('modalBookGenre').textContent = book.genero || 'N/A';
        document.getElementById('modalBookISBN13').textContent = book.isbn || 'N/A';
        document.getElementById('modalBookISBN10').textContent = book.isbn10 || 'N/A';
        document.getElementById('modalBookYear').textContent = book.anoPublicacao || 'N/A';
        document.getElementById('modalBookPages').textContent = book.paginas || 'N/A';
        document.getElementById('modalBookLanguage').textContent = book.idioma || 'N/A'; 
        document.getElementById('modalBookPublisher').textContent = book.editora || 'N/A';
        document.getElementById('modalBookReview').textContent = book.resenhaUsuario || 'Nenhuma resenha adicionada.';

        const editBookModalBtnDetails = document.getElementById('editBookModalBtnDetails');
        const deleteBookModalBtn = document.getElementById('deleteBookModalBtn');
        
        editBookModalBtnDetails.onclick = () => {
            closeDetailsModal();
            openAddEditModal(bookId);
        };
        deleteBookModalBtn.onclick = () => {
            if (confirm(`Tem certeza que deseja excluir "${book.titulo}"?`)) {
                deleteBook(bookId);
                closeDetailsModal();
            }
        };
         
        const editReviewIcon = detailsModal.querySelector('.edit-review-icon');
        if (editReviewIcon) {
            editReviewIcon.onclick = () => {
                alert('Funcionalidade de editar resenha a ser implementada!');
                
            };
        }

        detailsModal.style.display = 'block';
    }

    function openAddEditModal(bookId = null) {
        bookForm.reset();
        document.getElementById('bookId').value = '';

        if (bookId) {
            const book = books.find(b => b.id === parseInt(bookId));
            if (!book) return;
            modalFormTitle.textContent = 'Editar Livro';
            document.getElementById('bookId').value = book.id;
            document.getElementById('titulo').value = book.titulo || '';
            document.getElementById('autor').value = book.autor || '';
            document.getElementById('anoPublicacao').value = book.anoPublicacao || '';
            document.getElementById('genero').value = book.genero || '';
            document.getElementById('isbn').value = book.isbn || '';
            document.getElementById('paginas').value = book.paginas || '';
            document.getElementById('idioma').value = book.idioma || ''; 
            document.getElementById('editora').value = book.editora || '';
            document.getElementById('capaUrl').value = book.capaUrl || '';
            document.getElementById('sinopse').value = book.sinopse || '';
            document.getElementById('notaUsuario').value = book.notaUsuario !== undefined && book.notaUsuario !== null ? book.notaUsuario : '';
            document.getElementById('resenhaUsuario').value = book.resenhaUsuario || '';
        } else {
            modalFormTitle.textContent = 'Adicionar Novo Livro';
        }
        addEditModal.style.display = 'block';
    }

    bookForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const id = document.getElementById('bookId').value;
        const bookData = {
            titulo: document.getElementById('titulo').value.trim(),
            autor: document.getElementById('autor').value.trim(),
            anoPublicacao: parseInt(document.getElementById('anoPublicacao').value) || null,
            genero: document.getElementById('genero').value.trim(),
            isbn: document.getElementById('isbn').value.trim(),
           
            paginas: parseInt(document.getElementById('paginas').value) || null,
            idioma: document.getElementById('idioma').value.trim(), 
            editora: document.getElementById('editora').value.trim(),
            capaUrl: document.getElementById('capaUrl').value.trim(),
            sinopse: document.getElementById('sinopse').value.trim(),
            notaUsuario: document.getElementById('notaUsuario').value ? parseFloat(document.getElementById('notaUsuario').value) : null,
            resenhaUsuario: document.getElementById('resenhaUsuario').value.trim(),
        };

        if (!bookData.titulo || !bookData.autor) {
            alert("Título e Autor são obrigatórios.");
            return;
        }

        if (id) {
            bookData.id = parseInt(id);
            const existingBook = books.find(b => b.id === parseInt(id));
            bookData.dataAdicao = existingBook.dataAdicao; 
            if (existingBook.isbn10 && !bookData.isbn10) bookData.isbn10 = existingBook.isbn10; 
            updateBook(bookData);
        } else {
            bookData.id = Date.now();
            bookData.dataAdicao = new Date().toISOString().split('T')[0];
            addBook(bookData);
        }

        closeAddEditModal();
        renderBooks();
    });

    function addBook(book) {
        books.push(book);
        saveBooksToStorage();
    }

    function updateBook(updatedBook) {
        books = books.map(book => book.id === updatedBook.id ? {...book, ...updatedBook} : book); 
        saveBooksToStorage();
    }

    function deleteBook(bookId) {
        books = books.filter(book => book.id !== parseInt(bookId));
        saveBooksToStorage();
        renderBooks();
    }

    function searchBooks() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredBooks = books.filter(book =>
            book.titulo.toLowerCase().includes(searchTerm) ||
            book.autor.toLowerCase().includes(searchTerm)
        );
        renderBooks(filteredBooks);
    }
    searchButton.addEventListener('click', searchBooks);
    searchInput.addEventListener('keyup', (event) => {
        searchBooks(); 
    });

    addBookBtn.addEventListener('click', () => openAddEditModal());

    renderBooks();
});