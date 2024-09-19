using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class relationshipexamtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "studentId",
                table: "ExamMarks",
                newName: "studentid");

            migrationBuilder.RenameColumn(
                name: "examId",
                table: "ExamMarks",
                newName: "examid");

            migrationBuilder.AlterColumn<int>(
                name: "studentid",
                table: "ExamMarks",
                type: "int",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<int>(
                name: "examid",
                table: "ExamMarks",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.CreateIndex(
                name: "IX_ExamMarks_examid",
                table: "ExamMarks",
                column: "examid");

            migrationBuilder.CreateIndex(
                name: "IX_ExamMarks_studentid",
                table: "ExamMarks",
                column: "studentid");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMarks_exams_examid",
                table: "ExamMarks",
                column: "examid",
                principalTable: "exams",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ExamMarks_students_studentid",
                table: "ExamMarks",
                column: "studentid",
                principalTable: "students",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ExamMarks_exams_examid",
                table: "ExamMarks");

            migrationBuilder.DropForeignKey(
                name: "FK_ExamMarks_students_studentid",
                table: "ExamMarks");

            migrationBuilder.DropIndex(
                name: "IX_ExamMarks_examid",
                table: "ExamMarks");

            migrationBuilder.DropIndex(
                name: "IX_ExamMarks_studentid",
                table: "ExamMarks");

            migrationBuilder.RenameColumn(
                name: "studentid",
                table: "ExamMarks",
                newName: "studentId");

            migrationBuilder.RenameColumn(
                name: "examid",
                table: "ExamMarks",
                newName: "examId");

            migrationBuilder.AlterColumn<string>(
                name: "studentId",
                table: "ExamMarks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "examId",
                table: "ExamMarks",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);
        }
    }
}
