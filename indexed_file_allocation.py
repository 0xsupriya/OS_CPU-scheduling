#!/usr/bin/env python3
"""Indexed File Allocation - Uses an index block to store pointers to data blocks"""

def indexed_allocation(files, disk_size):
    """
    files: list of (filename, index_block, data_blocks)
    data_blocks: list of block numbers for file data
    """
    disk = {}  # block_num: (type, content)
    allocation = {}
    
    for filename, index_block, data_blocks in files:
        if index_block >= disk_size or index_block < 0:
            print(f"Error: Invalid index block {index_block} for {filename}")
            continue
        
        if index_block in disk:
            print(f"Error: Index block {index_block} already allocated")
            continue
        
        # check if data blocks are valid and free
        valid = True
        for block in data_blocks:
            if block >= disk_size or block < 0:
                print(f"Error: Invalid data block {block} for {filename}")
                valid = False
                break
            if block in disk:
                print(f"Error: Data block {block} already allocated")
                valid = False
                break
        
        if not valid:
            continue
        
        # allocate index block
        disk[index_block] = ("index", data_blocks)
        
        # allocate data blocks
        for block in data_blocks:
            disk[block] = ("data", filename)
        
        allocation[filename] = {
            "index_block": index_block,
            "data_blocks": data_blocks
        }
    
    return allocation, disk


def print_allocation(allocation):
    print("\nIndexed File Allocation:")
    print(f"{'File':<15} {'Index Block':<15} {'Data Blocks'}")
    print("-" * 60)
    for filename, info in allocation.items():
        data_str = ", ".join(map(str, info["data_blocks"]))
        print(f"{filename:<15} {info['index_block']:<15} [{data_str}]")


if __name__ == '__main__':
    files = [
        ("file1.txt", 0, [1, 2, 3, 4]),
        ("file2.txt", 5, [6, 7, 8]),
        ("file3.txt", 10, [11, 12]),
    ]
    disk_size = 20
    
    allocation, disk = indexed_allocation(files, disk_size)
    print_allocation(allocation)
    
    print(f"\nDisk Structure:")
    for block in sorted(disk.keys()):
        block_type, content = disk[block]
        if block_type == "index":
            print(f"Block {block}: Index block -> {content}")
        else:
            print(f"Block {block}: Data block ({content})")
