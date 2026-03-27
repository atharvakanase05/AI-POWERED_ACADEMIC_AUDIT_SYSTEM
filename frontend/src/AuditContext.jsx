import { createContext, useState } from "react";

export const AuditContext = createContext();

export const AuditProvider = ({ children }) => {
  const [studentData, setStudentData] = useState(null);
  const [facultyData, setFacultyData] = useState(null);
  const [institutionData, setInstitutionData] = useState(null);

  return (
    <AuditContext.Provider
      value={{
        studentData,
        setStudentData,
        facultyData,
        setFacultyData,
        institutionData,
        setInstitutionData,
      }}
    >
      {children}
    </AuditContext.Provider>
  );
};
