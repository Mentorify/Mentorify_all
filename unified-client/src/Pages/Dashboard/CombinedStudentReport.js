import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import R1 from "./Result";
import R2 from "./Test2/Result";
import R3 from "./Test3/Result";
import R4 from "./Test4/Result";
import R5 from "./Test5/Result";
import R6 from "./Test6/Result";
import R7 from "./Test7/Result";
import ReactToPrint from "react-to-print";
import "./print-styles.css";

const CombinedStudentReport = () => {
  const [attemptedTests, setAttemptedTests] = useState([]);
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const reportRef = React.useRef();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        setLoading(true);
        const urlParams = new URLSearchParams(location.search);
        const studentId = urlParams.get('studentId');
        
        if (!studentId) {
          setError('No student ID provided');
          setLoading(false);
          return;
        }

        const token = localStorage.getItem('token');
        const response = await fetch(`/api/profile/students/${studentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          setError('Failed to load student data');
          setLoading(false);
          return;
        }

        const data = await response.json();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching student data:', error);
        setError('Failed to fetch student data');
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
            testData: tests[testKey]
          });
        }
      }
      
      setAttemptedTests(attempted);
    }
  }, [studentData]);

  const renderTestResult = (test) => {
    const { testNumber, testData } = test;
    const props = {
      qn: testData.traits,
      userData: studentData,
      hidePrintButton: true // Hide individual print buttons in combined report
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

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
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

  if (error || !studentData) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body text-center">
                <h3 className="text-danger">Error Loading Report</h3>
                <p>{error || 'The requested student could not be found.'}</p>
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

  if (attemptedTests.length === 0) {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card mt-5">
              <div className="card-body text-center">
                <h3>No Test Reports Found</h3>
                <p>This student has not attempted any tests yet.</p>
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          {/* Action buttons - outside PDF content */}
          <div className="d-flex justify-content-end gap-2 mt-3 mb-3 no-print">
            <ReactToPrint
              trigger={() => (
                <button className="btn btn-success">
                  <i className="fas fa-download me-2"></i>
                  Download Report as PDF
                </button>
              )}
              content={() => reportRef.current}
              documentTitle={`Student_Report_${studentData.name}`}
                  onBeforeGetContent={() => {
                    return new Promise((resolve) => {
                      // Wait for charts to render completely - increased to 1.5 seconds for combined report
                      setTimeout(() => {
                        resolve();
                      }, 1500);
                    });
                  }}
                  print={async (printIframe) => {
                    const document = printIframe.contentDocument;
                    if (document) {
                      const html = document.getElementsByTagName("html")[0];
                      // Wait a bit more for everything to be ready - increased to 800ms
                      await new Promise((resolve) => setTimeout(resolve, 800));
                      // Print
                      printIframe.contentWindow.print();
                    }
                  }}
            />
            <button 
              className="btn btn-secondary" 
              onClick={() => window.close()}
            >
              <i className="fas fa-times me-2"></i>
              Close
            </button>
          </div>

          {/* PDF content */}
          <div className="card" ref={reportRef}>
            <div className="card-header">
              <div>
                <h3 className="mb-0">
                  <i className="fas fa-user-graduate me-2"></i>
                  Student Report - {studentData.name}
                </h3>
                <p className="text-muted mb-0">
                  School: {studentData.school} | Class: {studentData.Class}
                </p>
              </div>
            </div>
            <div className="card-body">
              {attemptedTests.map((test, index) => (
                <div key={test.testNumber} className="mb-4">
                  <h4>Test {test.testNumber} Report</h4>
                  <hr />
                  {renderTestResult(test)}
                </div>
              ))}
              
              {/* Footer for PDF */}
              <div className="text-center mt-5 pt-4" style={{ borderTop: '2px solid #dee2e6' }}>
                <p className="text-muted mb-0" style={{ fontSize: '14px', fontWeight: '500' }}>
                  Mentorify Technologies Private Limited
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>
        {`
          @media print {
            .no-print {
              display: none !important;
            }
            
            /* Ensure charts render properly in PDF */
            canvas {
              max-width: 100% !important;
              height: auto !important;
            }
            
            /* Prevent page breaks inside charts */
            .chart-container,
            canvas {
              page-break-inside: avoid !important;
              break-inside: avoid !important;
            }
            
            /* Ensure content fits on page */
            .card {
              box-shadow: none !important;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CombinedStudentReport;
