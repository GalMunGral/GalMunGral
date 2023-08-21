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
  return res.status == 200 ? res.data : null;
}

async function getRepos() {
  const res = await octokit.request("GET /user/repos", {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  return res.status == 200 ? res.data : [];
}

(async () => {
  const user = await getUser();

  process.stdout.write(
    '<h1><a href="/resume.pdf">Wenqi He</a></h1>\n' +
      "<p>\n" +
      "<b>National Center for Supercomputing Applications</b>, Urbana, IL, '22-'23<br>\n" +
      "<i>Graduate Research Assistant, Visualization</i><br>\n" +
      "</p>\n" +
      "<p>\n" +
      "<b>University of Illinois Urbana-Champaign</b>, Urbana-Champaign, IL, '22-'23<br>\n" +
      "<i>Master of Computer Science</i><br>\n" +
      "</p>\n" +
      "<p>\n" +
      "<b>Georgia Institute of Technology</b>, Atlanta, GA, '15-'19<br>\n" +
      "<i>Bachelor of Science in Computer Science, Minor in Physics</i><br>\n" +
      "</p>\n"
  );

  const repos = await getRepos();
  repos.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

  process.stdout.write("<h2>Pet Projects</h2>\n");
  process.stdout.write("<ul>");
  for (const repo of repos) {
    if (repo.has_pages && !exclude.has(repo.name)) {
      if (repo.owner.id == user?.id) {
        process.stdout.write(
          `<li><a href="/${repo.name}"><code>${repo.name}</code></a>${
            repo.description ? ": " + repo.description : ""
          }</li>\n`
        );
      }
    }
  }
  process.stdout.write("</ul>");
})();
