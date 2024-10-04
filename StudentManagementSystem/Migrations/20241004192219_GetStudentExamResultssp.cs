using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class GetStudentExamResultssp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                CREATE PROCEDURE GetStudentExamResults
                    @studentId INT,
                    @courseId INT
                AS
                BEGIN
                    -- Create temporary table to store results
                    CREATE TABLE #StudentExamResults
                    (
                        Id INT,
                        StudentId INT,
                        StudentName NVARCHAR(100),
                        ExamId INT,
                        ExamName NVARCHAR(100),
                        Grade NVARCHAR(10),
                        CourseId INT,
                        Marks INT,
                        CourseName NVARCHAR(100)
                    );

                    -- Insert data into the temporary table
                    INSERT INTO #StudentExamResults (Id, StudentId, StudentName, ExamId, ExamName, Grade, CourseId, Marks, CourseName)
                    SELECT 
                        EM.Id,
                        EM.studentid,
                        Stu.FullName,
                        EM.examid,
                        Ex.ExamName,
                        '', -- Assuming Grade is to be calculated or set later
                        EM.courseid,
                        EM.mark,
                        Co.[name]
                    FROM 
                        ExamMarks AS EM
                        INNER JOIN Students AS Stu ON Stu.Id = EM.studentid
                        INNER JOIN Exams AS Ex ON Ex.Id = EM.examid
                        INNER JOIN Courses AS Co ON Co.Id = EM.courseid
                    WHERE 
                        EM.studentid = @studentId 
                        AND EM.courseid = @courseId;

                    UPDATE se
                    SET se.Grade = g.name
                    FROM #StudentExamResults se
                    JOIN Grades g
                    ON se.Marks BETWEEN g.[from] AND g.[to];

                    -- Return the results from the temporary table
                    SELECT * FROM #StudentExamResults;

                    -- Optional: Drop the temporary table
                    -- DROP TABLE #StudentExamResults;
                END;
                ";

            // Execute the SQL script
            migrationBuilder.Sql(sql);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            var sql = @"
                DROP PROCEDURE IF EXISTS GetStudentExamResults;
                ";

            migrationBuilder.Sql(sql);
        }
    }
}
