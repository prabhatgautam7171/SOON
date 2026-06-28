import { useEffect, useState } from "react";
import { Calendar, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faVideo } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/actions/userActions.js";


export default function History() {
  const authState = useSelector((state) => state.auth);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const featchData = async () => {
    setLoading(true);
    await dispatch(getUser());
    setLoading(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    featchData();
  }, []);

  useEffect(() => {
    setMeetings(authState?.user?.meetings);
  }, [authState?.user_featch]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center  items-center bg-black">
        <div className="flex justify-center items-center">
          <h1 className="text-3xl flex gap-2  font-extrabold bg-gradient-to-r from-white via-blue-500 to-white bg-[length:200%] animate-[shimmer_2s_linear_infinite] bg-clip-text text-transparent">
             S⚆⚆N...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-8  py-8">
        <div className="mb-8 flex justify-between">
          <div>
            <h1 className="sm:text-3xl text-2xl  font-bold text-white mb-2">
              Meeting History
            </h1>
            <p className="text-gray-300 text-sm sm:text-base">
              View all your past meetings and their details
            </p>
          </div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="text-white cursor-pointer text-2xl"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </div>

        <div className="bg-black border border-gray-200 min-h-[70vh] rounded-lg shadow-sm mb-6">
          <div className="divide-y divide-gray-200">
            {meetings?.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <Calendar className="w-12 h-12 text-white mx-auto mb-4" />
                <p className="text-gray-600">No meetings found</p>
              </div>
            ) : (
              meetings?.map((meeting) => (
                <div
                  key={meeting._id}
                  className="px-6 py-5 hover:bg-slate-800 bg-slate-900 rounded-xl transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <FontAwesomeIcon icon={faVideo} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 ">
                          <h3 className="text-lg font-semibold text-white truncate">
                            {meeting.title}
                          </h3>
                        </div>
                        <div className="flex items-center mb-2">
                          <h3 className="text-sm  text-gray-300 ">
                            {meeting.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(meeting.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(meeting.date)}</span>
                          </div>

                          <div className="flex items-center space-x-1">
                            <span> code : {meeting.meetingId}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
