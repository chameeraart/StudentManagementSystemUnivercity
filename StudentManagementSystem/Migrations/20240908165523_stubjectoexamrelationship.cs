using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace StudentManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class stubjectoexamrelationship : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "examid",
                table: "subjects",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_subjects_examid",
                table: "subjects",
                column: "examid");

            migrationBuilder.AddForeignKey(
                name: "FK_subjects_exams_examid",
                table: "subjects",
                column: "examid",
                principalTable: "exams",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_subjects_exams_examid",
                table: "subjects");

            migrationBuilder.DropIndex(
                name: "IX_subjects_examid",
                table: "subjects");

            migrationBuilder.DropColumn(
                name: "examid",
                table: "subjects");
        }
    }
}
