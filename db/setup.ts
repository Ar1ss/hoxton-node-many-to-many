import Database from 'better-sqlite3'

const db = Database('./db/data.db', { verbose: console.log })

const applicants = [
  {
    id: 1,
    name: 'Aris',
    email: 'aris@mail.com'
  },
  {
    id: 2,
    name: 'Nico',
    email: 'nico@email.com'
  },
  {
    id: 3,
    name: 'Ed',
    email: 'ed@email.com'
  },
  {
    id: 4,
    name: 'Rizky',
    email: 'rizky@email.com'
  },
  {
    id: 5,
    name: 'Luna',
    email: 'luna@email.com'
  }
]

const interviews = [
  {
    id: 1,
    applicantId: 1,
    interviewersId: 3,
    date: '2020-01-01',
    score: 80
  },
  {
    id: 2,
    applicantId: 2,
    interviewersId: 4,
    date: '2020-01-02',
    score: 90
  },
  {
    id: 3,
    applicantId: 3,
    interviewersId: 5,
    date: '2020-01-03',
    score: 100
  },
  {
    id: 4,
    applicantId: 4,
    interviewersId: 1,
    date: '2020-01-04',
    score: 70
  },
  {
    id: 5,
    applicantId: 5,
    interviewersId: 2,
    date: '2020-01-05',
    score: 60
  }
]

const interviewers = [
  {
    id: 1,
    name: 'Bob',
    email: 'bob@email.com'
  },
  {
    id: 2,
    name: 'Alice',
    email: 'alice@email.com'
  },
  {
    id: 3,
    name: 'John',
    email: 'john@email.com'
  },
  {
    id: 4,
    name: 'Jane',
    email: 'jane@email.com'
  }
]

const createApplicantsTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS applicants (
        id INTEGER,
        name TEXT,
        email TEXT,
        PRIMARY KEY (id)
    );
`)

createApplicantsTable.run()

const insertApplicant = db.prepare(`
    INSERT INTO applicant (name, email)
    VALUES (@name, @email)
`)

const createInterviewersTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviewers (
        id INTEGER,
        name TEXT,
        email TEXT,
        PRIMARY KEY (id)
    );
`)
createInterviewersTable.run()

const insertInterviewers = db.prepare(`
    INSERT INTO interviewers (name, email)
    VALUES (@name, @email)
`)

const createInterviewTable = db.prepare(`
    CREATE TABLE IF NOT EXISTS interviews (
        id INTEGER,
        applicantId INTEGER,
        interviewersId INTEGER,
        date TEXT,
        score INTEGER,
        PRIMARY KEY (id),
        FOREIGN KEY (applicantId) REFERENCES applicant(id),
        FOREIGN KEY (interviewersId) REFERENCES interviewers(id)
    );
`)
createInterviewTable.run()

const insertInterviews = db.prepare(`
    INSERT INTO interviews (applicantId, interviewersId, date, score)
    VALUES (@applicantId, @interviewersId, @date, @score)
`)

for (const applicant of applicants) {
  insertApplicant.run(applicant)
}

for (const interviewer of interviewers) {
    insertInterviewers.run(interviewer)
    }

for (const interview of interviews) {
    insertInterviews.run(interview)
    }
    
