using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AccessRightUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserAccessRights_Employees_EmployeeId",
                table: "UserAccessRights");

            migrationBuilder.DropIndex(
                name: "IX_UserAccessRights_EmployeeId",
                table: "UserAccessRights");

            migrationBuilder.DropColumn(
                name: "EmployeeId",
                table: "UserAccessRights");

            migrationBuilder.CreateTable(
                name: "AccessRightEmployee",
                columns: table => new
                {
                    AccessRightsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccessRightEmployee", x => new { x.AccessRightsId, x.EmployeeId });
                    table.ForeignKey(
                        name: "FK_AccessRightEmployee_AccessRights_AccessRightsId",
                        column: x => x.AccessRightsId,
                        principalTable: "AccessRights",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AccessRightEmployee_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AccessRightEmployee_EmployeeId",
                table: "AccessRightEmployee",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccessRightEmployee");

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeId",
                table: "UserAccessRights",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserAccessRights_EmployeeId",
                table: "UserAccessRights",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserAccessRights_Employees_EmployeeId",
                table: "UserAccessRights",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
