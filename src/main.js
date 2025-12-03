async function loadWP() {
  const site = "kelassetara.wordpress.com";

  const postRes = await fetch(`https://public-api.wordpress.com/wp/v2/sites/${site}/posts?_embed`);
  const posts = await postRes.json();

  const container = document.getElementById("post-card");
  const frag = document.createDocumentFragment();

  for (const p of posts) {
    // Post Category Data
    const categories = p._embedded?.["wp:term"]?.[0]?.map(c => c.name) || [];
    const categoryText = categories.join(", ");
    // Excerpt Data
    let excerptHtml = p.excerpt.rendered; // Get Html
    let tempDiv = document.createElement("div"); // create temp. element to get only text html
    tempDiv.innerHTML = excerptHtml;
    let excerptText = tempDiv.textContent || tempDiv.innerText || "";
    // Post Date Data
    const postDate = p.date; // "2017-09-10T23:29:46"
    const dateObj = new Date(postDate);
    const formattedPostDate = dateObj.toLocaleDateString('id-ID');
    const maxLen = 150;
    if (excerptText.length > maxLen) {
      excerptText = excerptText.slice(0, maxLen) + "...";
    }
    // Featured Image Post Data
    const coverUrl = p._embedded?.["wp:featuredmedia"]?.[0]?.source_url || p.jetpack_featured_media_url || "/thumb1.png";

    const temp = document.createElement("template") // temporary wrapper

    temp.innerHTML = `
      <div class="basis-1/8 flex items-start sm:items-center justify-between px-6 pt-4 sm:py-9 rounded-tl-[40px] rounded-tr-[40px] md:rounded-tl-[56px] md:rounded-tr-[56px]">
          <a href="#" @click.prevent="open = true" class="text-xs sm:text-lg lg:text-base font-medium">
              ${categoryText}
          </a>
          <div class="rounded-full w-11 h-11 sm:w-14 sm:h-14 bg-white flex justify-center items-center">
              <a href="${p.link}">
                  <i class="fa-solid fa-arrow-up-right-from-square text-xs sm:text-lg"></i>
              </a>
          </div>
      </div>
      <div class="basis-3/8 flex flex-col justify-end gap-1.5 sm:gap-2.5 px-6">
          <h2 class="text-3xl md:text-5xl lg:text-3xl font-medium">${p.title.rendered}</h2>
          <p class="text-base md:text-xl lg:text-base hidden sm:block">${excerptText}</p>
          <div class="sm:mt-3">
              <span class="mr-3">
                  <i class="fa-regular fa-calendar text-xs md:text-base lg:text-xs"></i>
                  <span class="text-[10px] md:text-base lg:text-[10px] font-semibold">${formattedPostDate}</span>
              </span>

              <span>
                  <i class="fa-regular fa-eye text-xs md:text-base lg:text-xs"></i>
                  <span class="text-[10px] md:text-base lg:text-[10px] font-semibold">167 views</span>
              </span>
          </div>
      </div>
      
      <img src="${coverUrl}" class="basis-4/8 grayscale mt-2 rounded-[40px] sm:rounded-[56px] bg-cover bg-origin-padding" />
      
  `;

    frag.append(...temp.content.childNodes);
  };

  container.append(frag);
}

document.addEventListener("DOMContentLoaded", () => {
  loadWP();
});
