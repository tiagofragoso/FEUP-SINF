import React, { Component } from "react";
import { getWarehousePlant } from "../actions/warehousesService";

const WAREHOUSE_PADDING = 50;
const WAREHOUSE_WIDTH = 800;
const WAREHOUSE_HEIGHT = 200;
const GRID_STEP = 100;
const WAREHOUSE_PADDED_WIDTH = WAREHOUSE_WIDTH + (2 * WAREHOUSE_PADDING);
const WAREHOUSE_PADDED_HEIGHT =  WAREHOUSE_HEIGHT + (2 * WAREHOUSE_PADDING);
const ZONE_SIZE = 90;
const ZONE_PADDING = 1;
const WALL_SIZE = 5;

const SPECIAL_ZONES = ["01", "EXIT"];

export default class WarehousePlant extends Component {
    drawWarehousePlant = () => {
        this.warehouse_plant.forEach(({ x, y, id }) => {
            this.drawWarehouseZone(x, y, id);
        });
    }

    drawWarehouseZone = (x, y, id) => {
        const is_special_zone = SPECIAL_ZONES.includes(id);
        const height = is_special_zone ? (WAREHOUSE_PADDED_HEIGHT - (2 * WALL_SIZE)) : ZONE_SIZE;
        const border_color = is_special_zone ? "#331a00" : "#004280";
        const color = is_special_zone ? "#cc6900" : "#339cff";
        const text = id === "01" ? "01 Entry" : id;

        this.drawRectangle(
            WAREHOUSE_PADDING + (x * GRID_STEP) - (ZONE_SIZE / 2) - ZONE_PADDING,
            WAREHOUSE_PADDING + (y * GRID_STEP) - (height / 2) - ZONE_PADDING,
            ZONE_SIZE + (2 * ZONE_PADDING),
            height + (2 * ZONE_PADDING),
            border_color
        );

        this.drawRectangle(
            WAREHOUSE_PADDING + (x * GRID_STEP) - (ZONE_SIZE / 2),
            WAREHOUSE_PADDING + (y * GRID_STEP) - (height / 2),
            ZONE_SIZE,
            height,
            color
        );

        this.ctx.fillStyle = "black";
        this.ctx.fillText(
            text,
            WAREHOUSE_PADDING + (x * GRID_STEP),
            WAREHOUSE_PADDING + (y * GRID_STEP)
        );
    }

    drawRectangle = (x, y, width, height, color) => {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    async componentDidMount() {
        this.ctx = this.canvas.getContext("2d");
        this.ctx.font = "14px monospace";
        this.ctx.textBaseline = "middle";
        this.ctx.textAlign = "center";

        this.drawRectangle(0, 0, WAREHOUSE_PADDED_WIDTH, WAREHOUSE_PADDED_HEIGHT, "#747474");
        this.drawRectangle(WALL_SIZE, WALL_SIZE, WAREHOUSE_PADDED_WIDTH - (2 * WALL_SIZE),
            WAREHOUSE_PADDED_HEIGHT - (2 * WALL_SIZE), "#e9e9e9");

        this.warehouse_plant = await getWarehousePlant();

        this.drawWarehousePlant();
    }

    render() {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <canvas
                    ref={(el) => (this.canvas = el)}
                    width={WAREHOUSE_PADDED_WIDTH}
                    height={WAREHOUSE_PADDED_HEIGHT}
                />
            </div>
        );
    }
}
