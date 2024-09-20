using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class subjectaddcourserelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "courseid",
                table: "subjects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_subjects_courseid",
                table: "subjects",
                column: "courseid");

            migrationBuilder.AddForeignKey(
                name: "FK_subjects_courses_courseid",
                table: "subjects",
                column: "courseid",
                principalTable: "courses",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_subjects_courses_courseid",
                table: "subjects");

            migrationBuilder.DropIndex(
                name: "IX_subjects_courseid",
                table: "subjects");

            migrationBuilder.DropColumn(
                name: "courseid",
                table: "subjects");
        }
    }
}
