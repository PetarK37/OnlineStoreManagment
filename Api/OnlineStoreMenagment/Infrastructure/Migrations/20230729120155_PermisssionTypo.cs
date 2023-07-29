using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PermisssionTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsId",
                table: "AccessRightPermision");

            migrationBuilder.RenameColumn(
                name: "PermisionsId",
                table: "AccessRightPermision",
                newName: "PermissionsId");

            migrationBuilder.RenameIndex(
                name: "IX_AccessRightPermision_PermisionsId",
                table: "AccessRightPermision",
                newName: "IX_AccessRightPermision_PermissionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermissionsId",
                table: "AccessRightPermision",
                column: "PermissionsId",
                principalTable: "Permisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermissionsId",
                table: "AccessRightPermision");

            migrationBuilder.RenameColumn(
                name: "PermissionsId",
                table: "AccessRightPermision",
                newName: "PermisionsId");

            migrationBuilder.RenameIndex(
                name: "IX_AccessRightPermision_PermissionsId",
                table: "AccessRightPermision",
                newName: "IX_AccessRightPermision_PermisionsId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_Permisions_PermisionsId",
                table: "AccessRightPermision",
                column: "PermisionsId",
                principalTable: "Permisions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
