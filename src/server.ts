import express from 'express'
import cors from 'cors'
import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })
const app = express()
app.use(cors())
app.use(express.json())

const port = 3456

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})

app.get('/applicants', (req, res) => {
  const stmt = db.prepare('SELECT * FROM applicant')
  const applicants = stmt.all()
  res.json(applicants)
})

const getApplicantById = db.prepare('SELECT * FROM applicant WHERE id = ?')

const getInterviewsByApplicantId = db.prepare(
  'SELECT * FROM interview WHERE applicantId = ?'
)

const getInterviewersById = db.prepare(
  'SELECT * FROM interviewers WHERE id = ?'
)

app.get('/applicants/:id', (req, res) => {
  const applicant = getApplicantById.get(req.params.id)

  if (applicant) {
    applicant.interviews = getInterviewsByApplicantId.all(applicant.id)
    res.send(applicant)
  } else {
    res.status(404).send('Applicant not found')
  }
})

app.get('/interviews', (req, res) => {
  const interviews = db.prepare('SELECT * FROM interviews').all()
  res.json(interviews)
})


app.get(`/interviewers`, (req, res) => {
  const interviewers = db.prepare('SELECT * FROM interviewers').all()
  res.json(interviewers)
})

app.get('/interviewers/:id', (req, res) => {
  const interviewer = getInterviewersById.get(req.params.id)

  if (interviewer) {
    const interviews = getInterviewsByInterviewerId.all(interviewer.id)
    interviewer.interviews = interviews
    res.send(interviewer)
  } else {
    res.status(404).send('Interviewer not found')
  }
})

const getInterviewsByInterviewerId = db.prepare(
    'SELECT * FROM interview WHERE interviewersId = ?'
)
