import {  delBookById, getBookById } from '../api/data.js';
import { html } from '../lib.js';
import { getUserData } from '../utils.js';

const detailsTemplate = (book, isOwner, onDelete, canLike) => html `

<section id="details-page" class="details">
<div class="book-information">
    <h3>${book.title}</h3>
    <p class="type">Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <div class="actions">
        ${isOwner ? html `<a class="button" href="/edit/${book._id}">Edit</a>
        <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>` : null}
        
        
        ${isOwner ? null : html `<a class="button" href="#">Like</a>` }
       
        

        <!-- ( for Guests and Users )  -->
        <div class="likes">
            <img class="hearts" src="/images/heart.png">
            <span id="total-likes">Likes: 0</span>
        </div>
        <!-- Bonus -->
    </div>
</div>
<div class="book-description">
    <h3>Description:</h3>
    <p>${book.description}</p>
</div>
</section>
`;



export async function detailsPage(ctx) {

    const id = ctx.params.id;  
    const book = await getBookById(id);
      
    const userData = getUserData();
    const isOwner = userData && userData.id == book._ownerId
    const canLike = userData && userData.id != book._ownerId
    console.log(canLike);
    


    async function onDelete() {
        const choice = confirm(
          "Are you sure you want to DELETE this book forever?"
        );
    
        if (choice) {
          await delBookById(ctx.params.id);
          ctx.page.redirect("/");
        }
      }



    ctx.render(detailsTemplate(book, isOwner, onDelete, canLike));
}

