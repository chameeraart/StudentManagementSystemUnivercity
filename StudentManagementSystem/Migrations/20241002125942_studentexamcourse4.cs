using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class studentexamcourse4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "courseid",
                table: "ExamMarks",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ExamMarks_courseid",
                table: "ExamMarks",
                column: "courseid");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMarks_courses_courseid",
                table: "ExamMarks",
                column: "courseid",
                principalTable: "courses",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExamMarks_courses_courseid",
                table: "ExamMarks");

            migrationBuilder.DropIndex(
                name: "IX_ExamMarks_courseid",
                table: "ExamMarks");

            migrationBuilder.DropColumn(
                name: "courseid",
                table: "ExamMarks");
        }
    }
}
