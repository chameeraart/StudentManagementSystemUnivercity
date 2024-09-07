using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class coursesubjectforiegnkeys : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "subjectid",
                table: "CourseSubjects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "courseid",
                table: "CourseSubjects",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubjects_courseid",
                table: "CourseSubjects",
                column: "courseid");

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubjects_subjectid",
                table: "CourseSubjects",
                column: "subjectid");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSubjects_courses_courseid",
                table: "CourseSubjects",
                column: "courseid",
                principalTable: "courses",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_CourseSubjects_subjects_subjectid",
                table: "CourseSubjects",
                column: "subjectid",
                principalTable: "subjects",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CourseSubjects_courses_courseid",
                table: "CourseSubjects");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseSubjects_subjects_subjectid",
                table: "CourseSubjects");

            migrationBuilder.DropIndex(
                name: "IX_CourseSubjects_courseid",
                table: "CourseSubjects");

            migrationBuilder.DropIndex(
                name: "IX_CourseSubjects_subjectid",
                table: "CourseSubjects");

            migrationBuilder.AlterColumn<int>(
                name: "subjectid",
                table: "CourseSubjects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "courseid",
                table: "CourseSubjects",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
