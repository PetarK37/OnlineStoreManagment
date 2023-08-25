using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CustomerTypo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_CostumerOrders_CostumerOrderId",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "CostumerOrderId",
                table: "OrderItems",
                newName: "CustomerOrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_CostumerOrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_CustomerOrderId");

            migrationBuilder.RenameColumn(
                name: "CostumerName",
                table: "CostumerOrders",
                newName: "CustomerName");

            migrationBuilder.RenameColumn(
                name: "CostumerEmail",
                table: "CostumerOrders",
                newName: "CustomerEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_CostumerOrders_CustomerOrderId",
                table: "OrderItems",
                column: "CustomerOrderId",
                principalTable: "CostumerOrders",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OrderItems_CostumerOrders_CustomerOrderId",
                table: "OrderItems");

            migrationBuilder.RenameColumn(
                name: "CustomerOrderId",
                table: "OrderItems",
                newName: "CostumerOrderId");

            migrationBuilder.RenameIndex(
                name: "IX_OrderItems_CustomerOrderId",
                table: "OrderItems",
                newName: "IX_OrderItems_CostumerOrderId");

            migrationBuilder.RenameColumn(
                name: "CustomerName",
                table: "CostumerOrders",
                newName: "CostumerName");

            migrationBuilder.RenameColumn(
                name: "CustomerEmail",
                table: "CostumerOrders",
                newName: "CostumerEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_OrderItems_CostumerOrders_CostumerOrderId",
                table: "OrderItems",
                column: "CostumerOrderId",
                principalTable: "CostumerOrders",
                principalColumn: "Id");
        }
    }
}
