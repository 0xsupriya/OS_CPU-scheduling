# Simple Indexed File Allocation

def indexed_allocation(files, disk_size):
    """
    files: list of (filename, index_block, data_blocks)
    """
    disk = {}          # stores allocated blocks
    allocation = {}    # stores final file allocation info

    for filename, index_block, data_blocks in files:

        # --- Basic checks ---
        if index_block < 0 or index_block >= disk_size:
            print(f"Invalid index block {index_block} for {filename}")
            continue
        
        if index_block in disk:
            print(f"Index block {index_block} already used!")
            continue

        # Check each data block
        can_allocate = True
        for block in data_blocks:
            if block < 0 or block >= disk_size:
                print(f"Invalid data block {block} for {filename}")
                can_allocate = False
                break
            if block in disk:
                print(f"Data block {block} already used!")
                can_allocate = False
                break

        if not can_allocate:
            continue

        # --- Allocate index block ---
        disk[index_block] = ("index", data_blocks)

        # --- Allocate data blocks ---
        for block in data_blocks:
            disk[block] = ("data", filename)

        allocation[filename] = {
            "index_block": index_block,
            "data_blocks": data_blocks
        }

    return allocation, disk


def print_allocation(allocation):
    print("\nIndexed Allocation Result")
    print("File           Index Block     Data Blocks")
    print("-" * 50)

    for filename, info in allocation.items():
        data_list = ", ".join(map(str, info["data_blocks"]))
        print(f"{filename:<15} {info['index_block']:<15} {data_list}")


# ---------------- MAIN PROGRAM ----------------

if __name__ == '__main__':

    files = [
        ("file1.txt", 0, [1, 2, 3]),
        ("file2.txt", 5, [6, 7]),
        ("file3.txt", 10, [11, 12])
    ]

    disk_size = 20

    allocation, disk = indexed_allocation(files, disk_size)
    print_allocation(allocation)

    print("\nDisk Contents:")
    for block in sorted(disk.keys()):
        block_type, content = disk[block]
        print(f"Block {block}: {block_type} -> {content}")
