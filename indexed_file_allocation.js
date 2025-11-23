#!/usr/bin/env node
/**
 * Indexed File Allocation - Uses an index block to store pointers to data blocks
 */

function indexedAllocation(files, diskSize) {
    const disk = {}; // block_num: {type, content}
    const allocation = {};
    
    for (const file of files) {
        const { filename, indexBlock, dataBlocks } = file;
        
        if (indexBlock >= diskSize || indexBlock < 0) {
            console.log(`Error: Invalid index block ${indexBlock} for ${filename}`);
            continue;
        }
        
        if (disk[indexBlock]) {
            console.log(`Error: Index block ${indexBlock} already allocated`);
            continue;
        }
        
        // check if data blocks are valid and free
        let valid = true;
        for (const block of dataBlocks) {
            if (block >= diskSize || block < 0) {
                console.log(`Error: Invalid data block ${block} for ${filename}`);
                valid = false;
                break;
            }
            if (disk[block]) {
                console.log(`Error: Data block ${block} already allocated`);
                valid = false;
                break;
            }
        }
        
        if (!valid) continue;
        
        // allocate index block
        disk[indexBlock] = { type: "index", content: dataBlocks };
        
        // allocate data blocks
        for (const block of dataBlocks) {
            disk[block] = { type: "data", content: filename };
        }
        
        allocation[filename] = {
            indexBlock,
            dataBlocks
        };
    }
    
    return { allocation, disk };
}

function printAllocation(allocation) {
    console.log("\nIndexed File Allocation:");
    console.log("File".padEnd(15), "Index Block".padEnd(15), "Data Blocks");
    console.log("-".repeat(60));
    
    for (const [filename, info] of Object.entries(allocation)) {
        const dataStr = `[${info.dataBlocks.join(", ")}]`;
        console.log(
            filename.padEnd(15),
            String(info.indexBlock).padEnd(15),
            dataStr
        );
    }
}

// Main execution
if (require.main === module) {
    const files = [
        { filename: "file1.txt", indexBlock: 0, dataBlocks: [1, 2, 3, 4] },
        { filename: "file2.txt", indexBlock: 5, dataBlocks: [6, 7, 8] },
        { filename: "file3.txt", indexBlock: 10, dataBlocks: [11, 12] }
    ];
    const diskSize = 20;
    
    const { allocation, disk } = indexedAllocation(files, diskSize);
    printAllocation(allocation);
    
    console.log("\nDisk Structure:");
    const blockNums = Object.keys(disk).map(Number).sort((a, b) => a - b);
    for (const block of blockNums) {
        const { type, content } = disk[block];
        if (type === "index") {
            console.log(`Block ${block}: Index block -> [${content.join(", ")}]`);
        } else {
            console.log(`Block ${block}: Data block (${content})`);
        }
    }
}

module.exports = { indexedAllocation, printAllocation };
