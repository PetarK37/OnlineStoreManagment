using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AccessRightPermision2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_AccessRights_AccessRightId",
                table: "AccessRightPermision");

            migrationBuilder.RenameColumn(
                name: "AccessRightId",
                table: "AccessRightPermision",
                newName: "AccessRightsId");

            migrationBuilder.CreateIndex(
                name: "IX_Permisions_Type",
                table: "Permisions",
                column: "Type",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_AccessRights_AccessRightsId",
                table: "AccessRightPermision",
                column: "AccessRightsId",
                principalTable: "AccessRights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AccessRightPermision_AccessRights_AccessRightsId",
                table: "AccessRightPermision");

            migrationBuilder.DropIndex(
                name: "IX_Permisions_Type",
                table: "Permisions");

            migrationBuilder.RenameColumn(
                name: "AccessRightsId",
                table: "AccessRightPermision",
                newName: "AccessRightId");

            migrationBuilder.AddForeignKey(
                name: "FK_AccessRightPermision_AccessRights_AccessRightId",
                table: "AccessRightPermision",
                column: "AccessRightId",
                principalTable: "AccessRights",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
