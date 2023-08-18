const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.TOKEN,
});

const exclude = new Set(["galmungral.github.io"]);

async function getUser() {
  const res = await octokit.request("GET /user", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  if (res.status == 200) {
    return res.data;
  }
  return null;
}

(async () => {
  const user = await getUser();

  process.stdout.write("<h1>Wenqi He</h1>\n");
  const res = await octokit.request("GET /user/repos", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  if (res.status == 200) {
    process.stdout.write("<ul>");
    for (const repo of res.data) {
      if (repo.has_pages && !exclude.has(repo.name)) {
        if (repo.owner.id == user?.id) {
          process.stdout.write(
            `<li><a href="https://galmungral.github.io/${repo.name}"><code>/${
              repo.name
            }</code></a> ${
              repo.description ? `(${repo.description})` : ""
            }</li>\n`
          );
        }
      }
    }
    process.stdout.write("</ul>");
  }
})();
