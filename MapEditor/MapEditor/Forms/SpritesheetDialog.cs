using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class SpritesheetDialog : Form
    {
        public string SelectedPath;
        public SpritesheetDialog()
        {
            InitializeComponent();
        }

        private void ButtonOpenFolder_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            DialogResult dialogResult = dialog.ShowDialog();
            if (dialogResult == DialogResult.OK)
            {
                this.SelectedPath = dialog.SelectedPath;
                this.textBoxDir.Text = this.SelectedPath;
            }
        }

        private void ButtonMake_Click(object sender, EventArgs e)
        {
            //int width = 1147;
            //int height = 365;
            //string dir = this.textBoxDir.Text.Trim();
            //dir = "D:\\项目资料\\dior-vr\\2023-3-20\\Fleurs2 (1) (1) 30帧-2";

            int width = 4588;
            int height = 1458;
            string dir = this.textBoxDir.Text.Trim();
            dir = "D:\\项目资料\\dior-vr\\2023-3-20\\Fleurs2 (1) (1) 30帧";
            if (!string.IsNullOrEmpty(dir))
            {
                List<string> filenameList = new List<string>();

                // 读取目录图片
                DirectoryInfo directory = new DirectoryInfo(dir);
                FileSystemInfo[] filesArray = directory.GetFileSystemInfos();
                foreach(var item in filesArray)
                {
                    filenameList.Add(item.FullName);
                }

                // 对雪碧图排序
                filenameList.Sort((string a, string b) => a.CompareTo(b));

                int count = filenameList.Count;
                int maxWidth = width;
                int maxHeight = count * height;
                
                Bitmap map = new Bitmap(maxWidth, maxHeight);//定义画布
                Graphics g = Graphics.FromImage(map);//定义画笔

                int x = 0, y = 0;
                int tileWidth = width;
                int tileHeight = height;

                //注意:WinForm的openGL坐标系(0,0)点在左上角,图片的坐标系在以左下角为(0,0)点
                for (int i = 5; i < count; i++)
                {
                    x = 0;
                    y = i * tileHeight;
                    string path = filenameList[i];
                    Console.WriteLine("处理:{0}", path);
                    Image image = Image.FromStream(new MemoryStream(File.ReadAllBytes(path)));
                    g.DrawImage(image, new Rectangle(x, y, tileWidth, tileHeight));
                    Console.WriteLine("处理:{0}完成", path);
                }

                map.Save("E:\\test.png");
            }
        }
    }
}
