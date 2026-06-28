import { Calendar, Clock, Video, Copy, Trash2, Edit } from "lucide-react";

export function MeetingCard({ meeting, handleDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="bg-gray-900 border my-6 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-1">
            {meeting.title}
          </h3>
          {meeting.description && (
            <p className="text-sm text-gray-400 mb-3">{meeting.description}</p>
          )}
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(meeting.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{meeting.time}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{meeting.duration}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() =>
            window.open(
              `http://localhost:5173/meet/${meeting.meetingCode}`,
              "_blank",
            )
          }
          className="text-white p-2 w-full flex justify-center items-center gap-2 bg-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none  focus:ring-blue-800 shadow-lg shadow-blue-800/80  rounded-base text-base font-bold rounded-xl  text-center leading-5"
        >
          <Video className="w-6 h-6 " />
          <span>Join Meeting</span>
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(meeting.meetingCode)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
          title="Copy link"
        >
          <Copy className="w-4 h-4 text-white" />
        </button>

        <button
          onClick={() => handleDelete(meeting._id)}
          className="p-2 border border-gray-300 rounded-lg hover:bg-red-200 transition-colors"
          title="Delete meeting"
        >
          <Trash2 className="w-4 h-4 text-red-600" />
        </button>
      </div>
    </div>
  );
}
