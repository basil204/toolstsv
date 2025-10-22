
export type Country = 'INDIA' | 'US' | 'KOREA' | 'JAPAN';

export interface University {
  name: string;
  logo: string;
  subtitle: string;
  themeColor: string;
}

export interface StudentInfo {
  university: University;
  fullName: string;
  dob: string;
  validity: string;
  course: string;
  department: string;
  studentId: string;
  expiryDate: string;
  email: string;
  country: Country;
  labels: {
    fullName: string;
    dob: string;
    validity: string;
    course: string;
    department: string;
    studentId: string;
    expiryDate: string;
  };
}
