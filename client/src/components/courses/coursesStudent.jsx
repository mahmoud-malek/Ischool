// client/src/components/courses/coursesStudent.jsx
import { useAppstore } from "../../../store/index.js";
import { useEffect, useState } from "react";
import SideBarStudent from "../SideBar/sideBarStudent";
import Modal from "../ui/Modal";
import { apiClient } from "@/lib/apiClient.js";
import {COURSES_STUDENT_ROUTE} from "@/utils/constants.js";
import { format } from "date-fns";

const courses = [

    // don't forget to change the course description in database and add time to subject_class table
  { name: "Mathematics", time: "10:00 AM", description: "Mathematics course description" },
  { name: "English", time: "11:00 AM", description: "English course description" },
  { name: "Science", time: "12:00 PM", description: "Science course description" },
  { name: "Physics", time: "1:00 PM", description: "Physics course description" },
  { name: "Arabic", time: "2:00 PM", description: "Arabic course description" },
  { name: "History", time: "3:00 PM", description: "History course description" },
  { name: "French", time: "4:00 PM", description: "French course description" },
  { name: "Geography", time: "5:00 PM", description: "Geography course description" }
];

const formatTime = (timestamp) => {
  const date = new Date(parseInt(timestamp, 10));
  return format(date, 'hh:mm a');
};
	
const CoursesStudent = () => {
  const { userInfo } = useAppstore();
  const {classId} = userInfo;
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
      const fetchingCourses = async () => {
        const response = await apiClient.post(COURSES_STUDENT_ROUTE, {classId});
        if (response.status === 200 && response.data) {
          setCourseList(response.data);
        }
      }
      if (userInfo) {
        fetchingCourses();
      }
    }, [userInfo]);

  const handleCardClick = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-x-hidden">
      <SideBarStudent />
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold my-8">Courses</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseList.map((course, index) => (
            <div
              key={index}
              className={`${
                index % 2 ? "bg-[#decef2]" : "bg-purple-800"
              } p-4 rounded-3xl shadow-md flex flex-col items-center transition-all hover:scale-105 hover:translate-y-1.5 shadow-l cursor-pointer`}
              onClick={() => handleCardClick(course)}
            >
              <p
                className={`${
                  index % 2 ? "text-gray-800" : "text-white"
                } font-bold text-2xl`}
              >
                {course.name}
              </p>
              <p
                className={`${
                  index % 2 ? "text-gray-600" : "text-neutral-300"
                } text-sm`}
				  >
                {course.day}
              </p>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedCourse && (
          <div>
					  <h2 className="text-2xl font-bold mb-4">{selectedCourse.name}</h2>
                      <p className="text-gray-600 mb-4">Day: {selectedCourse.day}</p>
					  <p className="text-gray-600 mb-4">Starts: {selectedCourse.startTime}</p>
					  <p className="text-gray-600 mb-4">Ends: {selectedCourse.endTime}</p>
            <p>{selectedCourse.description}</p>
			
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CoursesStudent;