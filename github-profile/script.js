const apiKey = "20200901162005";
const apiUrl = "https://api.github.com/users/";

const input = document.getElementById("input");
const searchBtn = document.querySelector(".searchBtn");
const profile = document.getElementById("profile");


async function getGitHubRepos(userName) {
    const resp = await fetch(apiUrl+userName+"/repos");
    const respData = await resp.json();
   return respData;

}

async function getGithubProfile(userName) {
  const resp = await fetch(apiUrl + userName);
  const respData = await resp.json();
  console.log(respData);
  const reposData = await getGitHubRepos(userName);
  console.log(reposData.slice(0,10).sort((a,b) => a.name - b.name));

  const reposArr = [];
  reposData.slice(0,10).sort((a,b) => a.name - b.name).forEach(repos => {
    reposArr.push({"name": repos.name, "url": repos.html_url});
  })
  console.log(1);
  console.log(reposArr);
  const main = document.createElement("div");
    main.classList.add("main");
    main.innerHTML = `
            <img src="${respData.avatar_url}" alt="${respData.name}">
            <div class="desc">
                <h2 class="name">${respData.name}</h2>
                <h3 class="company">${respData.company}</h3>
                <p class="bio">${respData.bio}</p>
                <div class="active">
                    <span>${respData.public_repos} Public Repos</span>
                    <span>${respData.followers} Followers</span>
                    <span>${respData.following} Following</span>
                </div>
                <div class="repos">
                    ${reposArr.map(element => {
                        return `<a href=${element.url}>${element.name}</a>`
                    }).join("")}
                </div>
            </div>
        `;
    profile.appendChild(main);
}

searchBtn.addEventListener("click", () => {
  profile.innerHTML = "";

  const userName = input.value;

  if (userName) {
    getGithubProfile(userName);
  }
  input.value = "";
});

