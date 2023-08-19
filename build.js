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
    "<h1>Wenqi He</h1>\n" +
      '<h2><a href="./resume.pdf">Resume</a></h2>\n' +
      "<b>National Center for Supercomputing Applications</b>, Urbana, IL, '22-'23<br>\n" +
      "<i>Graduate Research Assistant</i><br>\n" +
      "<b>University of Illinois Urbana-Champaign</b>, Urbana-Champaign, IL, '22-'23<br>\n" +
      "<i>Master of Computer Science</i><br>\n" +
      "<b>Georgia Institute of Technology</b>, Atlanta, GA, '15-'19<br>\n" +
      '<i>Bachelor of Science in Computer Science, Minor in <a href="./academic/GT-PHYS-7125-Paper.pdf">Physics</a></i><br>\n'
  );

  const repos = await getRepos();
  repos.sort((a, b) => (a.created_at > b.created_at ? -1 : 1));

  process.stdout.write("<h2>Demos</h2>\n");
  process.stdout.write("<ul>");
  for (const repo of repos) {
    if (repo.has_pages && !exclude.has(repo.name)) {
      if (repo.owner.id == user?.id) {
        process.stdout.write(
          `<li><a href="https://galmungral.github.io/${repo.name}"><code>${
            repo.name
          }</code></a>${repo.description ? ": " + repo.description : ""}</li>\n`
        );
      }
    }
  }
  process.stdout.write("</ul>");
})();
