import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import useAuth from '../../hooks/useAuth'

const TranskripNilai = () => {
  const { user } = useAuth()

  // Mock data for grades
  const grades = [
    { id: 1, course: 'Pemrograman Dasar', semester: 'Ganjil 2023', grade: 'A', credits: 3 },
    { id: 2, course: 'Algoritma dan Struktur Data', semester: 'Ganjil 2023', grade: 'A-', credits: 4 },
    { id: 3, course: 'Basis Data', semester: 'Genap 2024', grade: 'B+', credits: 3 },
    { id: 4, course: 'Sistem Operasi', semester: 'Genap 2024', grade: 'A', credits: 3 }
  ]

  const calculateGPA = () => {
    const gradePoints = { 'A': 4.0, 'A-': 3.7, 'B+': 3.3, 'B': 3.0, 'B-': 2.7, 'C+': 2.3, 'C': 2.0, 'C-': 1.7, 'D': 1.0, 'F': 0.0 }
    let totalPoints = 0
    let totalCredits = 0
    
    grades.forEach(grade => {
      totalPoints += gradePoints[grade.grade] * grade.credits
      totalCredits += grade.credits
    })
    
    return (totalPoints / totalCredits).toFixed(2)
  }

  return (
    <div className="flex">
      <Sidebar role="mahasiswa" />
      <div className="main-content">
        <Navbar user={user} />
        <div className="transkrip-content">
          <h1 className="text-2xl font-bold mb-6">Transkrip Nilai</h1>
          
          <div className="card mb-6">
            <h3 className="font-bold mb-2">IPK: {calculateGPA()}</h3>
            <p>Total SKS: {grades.reduce((sum, grade) => sum + grade.credits, 0)}</p>
          </div>
          
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Kode</th>
                  <th>Nama Mata Kuliah</th>
                  <th>Semester</th>
                  <th>Nilai</th>
                  <th>SKS</th>
                </tr>
              </thead>
              <tbody>
                {grades.map(grade => (
                  <tr key={grade.id}>
                    <td>{grade.id}</td>
                    <td>{grade.course}</td>
                    <td>{grade.semester}</td>
                    <td>{grade.grade}</td>
                    <td>{grade.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TranskripNilai