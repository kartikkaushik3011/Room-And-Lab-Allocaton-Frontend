import React from 'react';
import Blocks from './Blocks';
import blockImage from "./assets/blockImage.jpg";

function AllBlocks() {
    return (
        <div className="container">
            <div className="row justify-content-around mb-4">
                <div className="col-md-5 col-sm-12">
                    <Blocks
                        image={blockImage}
                        block="Kalpana Chawla"
                        info="A block of college"
                        block_code="kc"
                    />
                </div>
                <div className="col-md-5 col-sm-12">
                    <Blocks
                        image={blockImage}
                        block="Aryabhatta"
                        info="A block of college"
                        block_code="ab"
                    />
                </div>
            </div>
            <div className="row justify-content-around mb-4">
                <div className="col-md-5 col-sm-12">
                    <Blocks
                        image={blockImage}
                        block="Ramanujan"
                        info="A block of college"
                        block_code="rj"
                    />
                </div>
                <div className="col-md-5 col-sm-12">
                    <Blocks
                        image={blockImage}
                        block="Bhabha"
                        info="A block of college"
                        block_code="bb"
                    />
                </div>
            </div>
            <div className="row justify-content-around mb-4">
                <div className="col-md-5 col-sm-12">
                    <Blocks
                        image={blockImage}
                        block="Raman"
                        info="A block of college"
                        block_code="rm"
                    />
                </div>
            </div>
        </div>
    );
}

export default AllBlocks;
