using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class Price : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ItemId",
                table: "Prices",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Prices_ItemId",
                table: "Prices",
                column: "ItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prices_Items_ItemId",
                table: "Prices",
                column: "ItemId",
                principalTable: "Items",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Prices_Items_ItemId",
                table: "Prices");

            migrationBuilder.DropIndex(
                name: "IX_Prices_ItemId",
                table: "Prices");

            migrationBuilder.DropColumn(
                name: "ItemId",
                table: "Prices");
        }
    }
}
