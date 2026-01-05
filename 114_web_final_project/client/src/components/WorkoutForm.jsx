import { useState } from 'react'
import { useWorkoutsContext } from '../hooks/useWorkoutsContext'

const WorkoutForm = () => {
    const { dispatch } = useWorkoutsContext()

    const [title, setTitle] = useState('')
    const [load, setLoad] = useState('')
    const [reps, setReps] = useState('')
    const [duration, setDuration] = useState('')
    const [distance, setDistance] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const workout = { title, load, reps, duration, distance }

        const response = await fetch('http://localhost:4000/api/workouts', {
            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setLoad('')
            setReps('')
            setDuration('')
            setDistance('')
            setError(null)
            setEmptyFields([])
            dispatch({ type: 'CREATE_WORKOUT', payload: json })
        }
    }

    return (
        <form className="bg-white p-8 rounded-2xl shadow-lg sticky top-6 border border-gray-100" onSubmit={handleSubmit}>
            <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
                <span className="material-symbols-outlined text-emerald-600 text-3xl">edit_note</span>
                <h3 className="text-2xl font-bold text-gray-800">新增運動記錄</h3>
            </div>

            <div className="mb-5">
                <label className="block text-gray-700 font-semibold mb-2 text-sm">運動項目:</label>
                <input
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    placeholder="例如: 臥推、慢跑..."
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 placeholder-gray-400 ${emptyFields.includes('title') ? 'border-red-500' : 'border-gray-200'}`}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">重量 (kg):</label>
                    <input
                        type="number"
                        onChange={(e) => setLoad(e.target.value)}
                        value={load}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 ${emptyFields.includes('load') ? 'border-red-500' : 'border-gray-200'}`}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">次數:</label>
                    <input
                        type="number"
                        onChange={(e) => setReps(e.target.value)}
                        value={reps}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 ${emptyFields.includes('reps') ? 'border-red-500' : 'border-gray-200'}`}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">時間 (分):</label>
                    <input
                        type="number"
                        onChange={(e) => setDuration(e.target.value)}
                        value={duration}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 ${emptyFields.includes('duration') ? 'border-red-500' : 'border-gray-200'}`}
                    />
                </div>

                <div className="mb-5">
                    <label className="block text-gray-700 font-semibold mb-2 text-sm">距離 (km):</label>
                    <input
                        type="number"
                        onChange={(e) => setDistance(e.target.value)}
                        value={distance}
                        className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all duration-200 ${emptyFields.includes('distance') ? 'border-red-500' : 'border-gray-200'}`}
                    />
                </div>
            </div>

            <button className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3.5 px-4 rounded-xl hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 font-bold text-lg mt-2 flex justify-center items-center gap-2">
                <span className="material-symbols-outlined">add_circle</span>
                新增記錄
            </button>
            {error && <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r text-sm flex items-center gap-2">
                <span className="material-symbols-outlined">error</span>
                {error}
            </div>}
        </form>
    )
}

export default WorkoutForm
