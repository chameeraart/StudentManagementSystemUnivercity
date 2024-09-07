using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class assigncoursetostudent : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "courseStudents",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    courseid = table.Column<int>(type: "int", nullable: true),
                    studentid = table.Column<int>(type: "int", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime2", nullable: false),
                    created_by = table.Column<int>(type: "int", nullable: false),
                    updated_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    updated_by = table.Column<int>(type: "int", nullable: true),
                    deleted_at = table.Column<DateTime>(type: "datetime2", nullable: true),
                    deleted_by = table.Column<int>(type: "int", nullable: true),
                    isactive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_courseStudents", x => x.id);
                    table.ForeignKey(
                        name: "FK_courseStudents_courses_courseid",
                        column: x => x.courseid,
                        principalTable: "courses",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_courseStudents_students_studentid",
                        column: x => x.studentid,
                        principalTable: "students",
                        principalColumn: "id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_courseStudents_courseid",
                table: "courseStudents",
                column: "courseid");

            migrationBuilder.CreateIndex(
                name: "IX_courseStudents_studentid",
                table: "courseStudents",
                column: "studentid");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "courseStudents");
        }
    }
}
