const express = require('express');
const server = express();
server.listen(3000);
server.use(express.json());

const projects = [];
let n = 0;

server.use((req, res, next) => {
  
  n = n + 1;
  console.log(n);
  next();

});

function verificarId(req, res, next) {
  
  const {id} = req.params;
  const project = projects.find(p => p.id == id);
  
  if(!project) {
    res.status(400).json({error: 'Esse id não foi encontrado !'});
  }

  next();

}

server.post('/projects', (req, res) => {
  const {id, title} = req.body; 

  const project = {
    id,
    title,
    tasks: []
  }

  projects.push(project);

  return res.json(projects);

});

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.put('/projects/:id', verificarId, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;
  
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(project);
});

server.delete('/projects/:id', verificarId, (req, res) => {
  const {id} = req.params;
  
  const id2 = projects.findIndex(p => p.id == id);

  projects.splice(id2, 1);

  return res.send();
});

server.post('/projects/:id/tasks', verificarId, (req, res) => {
  const {id} = req.params;
  const {title} = req.body;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);

  return res.json(project);

});