import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import R1 from "./Result";
import R2 from "./Test2/Result";
import R3 from "./Test3/Result";
import R4 from "./Test4/Result";
import R5 from "./Test5/Result";
import R6 from "./Test6/Result";
import R7 from "./Test7/Result";
import testName from "./testName";

const StudentReport = () => {
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const studentId = urlParams.get('studentId');
        
        if (studentId) {
          // Fetch student data by ID
          const response = await fetch(`/api/profile/students/${studentId}`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json'
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setStudentData(data);
          } else {
            console.error('Failed to fetch student data');
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [location.search]);

  useEffect(() => {
    if (studentData && studentData.tests) {
      const tests = studentData.tests;
      const attempted = [];
      
      // Check each test for attempts
      for (let i = 1; i <= 7; i++) {
        const testKey = `test${i}`;
        if (tests[testKey] && tests[testKey].attempt === true) {
          attempted.push({
            testNumber: i,
            testName: testName[i],
            testData: tests[testKey]
          });
        }
      }
      
      setAttemptedTests(attempted);
    }
  }, [studentData]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading student report...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="fas fa-exclamation-triangle fa-4x text-warning"></i>
                </div>
                <h3 className="text-warning">Student Not Found</h3>
                <p className="text-muted">
                  Unable to load student data.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.close()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If no tests attempted, show popup message
  if (attemptedTests.length === 0) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <div className="mb-4">
                  <i className="fas fa-clipboard-list fa-4x text-muted"></i>
                </div>
                <h3 className="text-muted">No Test Reports Found</h3>
                <p className="text-muted">
                  This student has not attempted any tests yet.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => window.close()}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const renderTestResult = (test) => {
    const { testNumber, testData } = test;
    const props = {
      qn: testData.traits,
      userData: studentData
    };

    switch (testNumber) {
      case 1:
        return <R1 {...props} />;
      case 2:
        return <R2 {...props} />;
      case 3:
        return <R3 {...props} />;
      case 4:
        return <R4 {...props} />;
      case 5:
        return <R5 {...props} />;
      case 6:
        return <R6 {...props} />;
      case 7:
        return <R7 {...props} />;
      default:
        return <div>Test result not available</div>;
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="card mt-4">
            <div className="card-header">
              <h3 className="mb-0">
                <i className="fas fa-user-graduate me-2"></i>
                Student Report - {studentData.name}
              </h3>
              <p className="text-muted mb-0">
                School: {studentData.school} | Class: {studentData.Class}
              </p>
            </div>
            <div className="card-body">
              {/* Navigation Pills */}
              <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                {attemptedTests.map((test, index) => (
                  <li className="nav-item" key={test.testNumber}>
                    <button
                      className={`nav-link ${index === activeTab ? 'active' : ''}`}
                      onClick={() => setActiveTab(index)}
                      type="button"
                      role="tab"
                    >
                      {test.testName}
                    </button>
                  </li>
                ))}
              </ul>

              {/* Tab Content */}
              <div className="tab-content">
                {attemptedTests.map((test, index) => (
                  <div
                    key={test.testNumber}
                    className={`tab-pane fade ${index === activeTab ? 'show active' : ''}`}
                    role="tabpanel"
                  >
                    {renderTestResult(test)}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReport;
