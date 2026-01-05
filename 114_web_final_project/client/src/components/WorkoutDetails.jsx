import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { zhTW } from 'date-fns/locale'
import { motion } from 'framer-motion'

const WorkoutDetails = ({ workout }) => {
    const { dispatch } = useWorkoutsContext()

    const handleClick = async () => {
        const response = await fetch('http://localhost:4000/api/workouts/' + workout._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_WORKOUT', payload: json })
        }
    }

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-sm p-6 mb-6 relative border border-gray-100 hover:shadow-xl transition-all duration-300 group"
        >
            <div className="flex items-start justify-between mb-4">
                <h4 className="text-xl text-gray-800 font-bold capitalize flex items-center gap-2">
                    <span className="material-symbols-outlined text-emerald-500">
                        assignment
                    </span>
                    {workout.title}
                </h4>
            </div>

            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100/50">
                {workout.load !== undefined && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">fitness_center</span>
                        <span><strong>重量:</strong> {workout.load} kg</span>
                    </div>
                )}
                {workout.reps !== undefined && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">autorenew</span>
                        <span><strong>次數:</strong> {workout.reps}</span>
                    </div>
                )}
                {workout.duration !== undefined && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">timer</span>
                        <span><strong>時間:</strong> {workout.duration} 分</span>
                    </div>
                )}
                {workout.distance !== undefined && (
                    <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-lg">straighten</span>
                        <span><strong>距離:</strong> {workout.distance} km</span>
                    </div>
                )}
            </div>

            <div className="flex justify-between items-end mt-4">
                <p className="text-gray-400 text-xs font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">schedule</span>
                    {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true, locale: zhTW })}
                </p>

                <button
                    className="p-2 rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
                    onClick={handleClick}
                    title="刪除記錄"
                >
                    <span className="material-symbols-outlined">delete</span>
                </button>
            </div>
        </motion.div>
    )
}

export default WorkoutDetails
