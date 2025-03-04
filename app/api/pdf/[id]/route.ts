export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params // 'a', 'b', or 'c'
    console.log("ID =>", id)

}