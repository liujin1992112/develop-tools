using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace MapEditor.Forms
{
    public partial class SpritesheetDialog : Form
    {
        /// <summary>
        /// 选择的路径
        /// </summary>
        public string selectedPath;

        /// <summary>
        /// 选择保存目录
        /// </summary>
        public string output;

        /// <summary>
        /// 雪碧图的行数
        /// </summary>
        public int rows;

        /// <summary>
        /// 雪碧图的列数
        /// </summary>
        public int cols;

        /// <summary>
        /// 每一张雪碧图的宽度
        /// </summary>
        public int unitWidth;

        /// <summary>
        /// 每一张雪碧图的高度
        /// </summary>
        public int unitHeight;

        /// <summary>
        /// 需要合并为雪碧图的图片列表
        /// </summary>
        public List<string> fullNameList;

        //public Settings setting = new Settings();

        public SpritesheetDialog()
        {
            InitializeComponent();
            InitUI();
        }

        public void InitUI()
        {
            this.numericUpDownCols.Enabled = false;
            this.numericUpDownUnitWidth.Enabled = false;
            this.numericUpDownUnitHeight.Enabled = false;
            this.textBoxOutput.Enabled = false;
        }

        private void ButtonOpenFolder_Click(object sender, EventArgs e)
        {
            FolderBrowserDialog dialog = new FolderBrowserDialog();
            DialogResult dialogResult = dialog.ShowDialog();
            if (dialogResult == DialogResult.OK)
            {
                string path = dialog.SelectedPath;
                this.InitSpritesheet(path);
            }
        }

        /// <summary>
        /// 制作雪碧图
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void ButtonMake_Click(object sender, EventArgs e)
        {

            this.rows = (int)this.numericUpDownRows.Value;
            this.cols = (int)this.numericUpDownCols.Value;

            this.unitWidth = (int)this.numericUpDownUnitWidth.Value;
            this.unitHeight = (int)this.numericUpDownUnitHeight.Value;

            string dir = this.textBoxDir.Text.Trim();
            if (!string.IsNullOrEmpty(dir))
            {
                this.CalSpritesheetRows();
                this.MakeSpritesheet(this.fullNameList, this.output);
            }
        }

        private void textBoxDir_DragDrop(object sender, DragEventArgs e)
        {

        }

        private void textBoxDir_DragEnter(object sender, DragEventArgs e)
        {
            string[] strDrop = (string[])e.Data.GetData(DataFormats.FileDrop, true);
            if (strDrop.Length == 1)
            {
                string path = strDrop[0];
                FileAttributes attr = File.GetAttributes(path);
                if ((attr & FileAttributes.Directory) == FileAttributes.Directory)
                {
                    this.InitSpritesheet(path);
                }
                else
                {
                    MessageBox.Show("请拖入文件夹");
                }
            }
            else
            {
                MessageBox.Show("请拖入你需要生成雪碧图的目录!!!", "提示", MessageBoxButtons.OK);
            }
        }

        private void SpritesheetDialog_DragDrop(object sender, DragEventArgs e)
        {
        }

        /// <summary>
        /// 根据图形获取图形的扩展名 zgke@sina.com qq:116149
        /// </summary>
        /// <param name="p_Image">图形</param>
        /// <returns>扩展名</returns>
        public static string GetImageExtension(Image p_Image)
        {
            Type Type = typeof(ImageFormat);
            System.Reflection.PropertyInfo[] _ImageFormatList = Type.GetProperties(BindingFlags.Static | BindingFlags.Public);
            for (int i = 0; i != _ImageFormatList.Length; i++)
            {
                ImageFormat _FormatClass = (ImageFormat)_ImageFormatList[i].GetValue(null, null);
                if (_FormatClass.Guid.Equals(p_Image.RawFormat.Guid))
                {
                    return _ImageFormatList[i].Name.ToLower();
                }
            }
            return "";
        }

        /// <summary>
        /// 是否为图片文件夹
        /// </summary>
        /// <param name="path"></param>
        /// <returns></returns>
        public static bool IsRealImage(string path)
        {
            try
            {
                Image img = Image.FromFile(path);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("\nIt is a fate image", e);
                return false;
            }
        }

        /// <summary>
        /// 拖入文件夹或者多张需要合并为雪碧图的图片
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void SpritesheetDialog_DragEnter(object sender, DragEventArgs e)
        {
            Console.WriteLine("SpritesheetDialog_DragEnter");
            string[] strDrop = (string[])e.Data.GetData(DataFormats.FileDrop, true);

            if (strDrop.Length == 1)
            {
                // 单个文件,判断拖入的是文件夹或者文件
                string path = strDrop[0];
                FileAttributes attr = File.GetAttributes(path);
                if ((attr & FileAttributes.Directory) == FileAttributes.Directory)
                {
                    this.InitSpritesheet(path);
                }
                else
                {
                    MessageBox.Show("仅仅支持多个文件合并为雪碧图");
                }
            }
            else
            {
                // 多个文件
                this.fullNameList = new List<string>();
                bool isInitDirectory = false;
                foreach (var path in strDrop)
                {
                    if (IsRealImage(path))
                    {
                        this.fullNameList.Add(path);
                        if (!isInitDirectory)
                        {
                            // 默认目录
                            this.selectedPath = Directory.GetParent(path).FullName;
                            string directory = this.selectedPath;
                            int idx = 0;

                            Image tmp = Metafile.FromFile(path);

                            // 设置雪碧图的宽度和高度
                            this.unitWidth = tmp.Width;
                            this.unitHeight = tmp.Height;

                            string fileName = string.Format("{0}{1}.{2}", directory, idx, GetImageExtension(tmp));
                            string output = Path.Combine(path, fileName);
                            this.output = output;
                            if (File.Exists(output))
                            {
                                // 判断是否存在，存在，则提示覆盖，还是重新输出新路径
                                idx++;
                            }
                            isInitDirectory = true;
                        }
                    }
                }

                // 更新界面信息
                this.numericUpDownUnitWidth.Value = this.unitWidth;
                this.numericUpDownUnitHeight.Value = this.unitHeight;
                this.textBoxDir.Text = this.selectedPath;
                this.textBoxOutput.Text = this.output;

                this.numericUpDownCols.Enabled = true;
                this.numericUpDownUnitWidth.Enabled = true;
                this.numericUpDownUnitHeight.Enabled = true;
                this.textBoxOutput.Enabled = true;
            }
        }

        public void InitSpritesheet(string path)
        {
            this.selectedPath = path;

            // 合并文件夹下的图片为雪碧图
            List<string> fullNameList = new List<string>();
            DirectoryInfo directory = new DirectoryInfo(path);
            FileSystemInfo[] filesArray = directory.GetFileSystemInfos();
            foreach (var item in filesArray)
            {
                fullNameList.Add(item.FullName);
            }
            this.fullNameList = fullNameList;
            if (fullNameList.Count > 0)
            {
                Image tmp = Metafile.FromFile(fullNameList[0]);

                // 设置雪碧图的宽度和高度
                this.unitWidth = tmp.Width;
                this.unitHeight = tmp.Height;

                int idx = 0;
                string fileName = string.Format("{0}{1}.{2}", directory.Name, idx, GetImageExtension(tmp));
                string output = Path.Combine(path, fileName);
                if (File.Exists(output))
                {
                    // 判断是否存在，存在，则提示覆盖，还是重新输出新路径
                    idx++;
                }

                this.output = output;

                // 更新默认行号为图片数量
                this.numericUpDownRows.Value = fullNameList.Count;
                this.numericUpDownCols.Value = 1;
                this.rows = fullNameList.Count;
                this.cols = 1;

                // 更新界面信息
                this.numericUpDownUnitWidth.Value = this.unitWidth;
                this.numericUpDownUnitHeight.Value = this.unitHeight;
                this.textBoxDir.Text = path;
                this.textBoxOutput.Text = output;

                this.numericUpDownCols.Enabled = true;
                this.numericUpDownUnitWidth.Enabled = true;
                this.numericUpDownUnitHeight.Enabled = true;
                this.textBoxOutput.Enabled = true;

                //DialogResult result = MessageBox.Show("加载完成", "提示", MessageBoxButtons.OK);
                //if (result == DialogResult.OK)
                //{

                //}
            }
        }

        /// <summary>
        /// 制作雪碧图
        /// </summary>
        /// <param name="filenameList"></param>
        /// <param name="output"></param>
        public void MakeSpritesheet(List<string> filenameList, string output)
        {
            filenameList.Sort((string a, string b) => a.CompareTo(b));

            int count = filenameList.Count;

            // 计算生成雪碧图的尺寸
            int maxWidth = this.unitWidth * this.cols;
            int maxHeight = this.unitHeight * this.rows;

            // 定义画布
            Bitmap map = new Bitmap(maxWidth, maxHeight);
            // 定义画笔
            Graphics g = Graphics.FromImage(map);

            int x = 0, y = 0;
            int tileWidth = this.unitWidth;
            int tileHeight = this.unitHeight;

            // 注意:WinForm的openGL坐标系(0,0)点在左上角,图片的坐标系在以左下角为(0,0)点
            for (int i = 0; i < count; i++)
            {
                x = (i % this.cols) * tileWidth;
                y = (i / this.cols) * tileHeight;
                string path = filenameList[i];
                Console.WriteLine("处理:{0}", path);
                Image image = Image.FromStream(new MemoryStream(File.ReadAllBytes(path)));
                g.DrawImage(image, new Rectangle(x, y, tileWidth, tileHeight));
                Console.WriteLine("处理:{0}完成", path);
            }

            map.Save(output);

            DialogResult result = MessageBox.Show("制作成功", "提示", MessageBoxButtons.OK);
            if (result == DialogResult.OK)
            {

            }
        }

        /// <summary>
        /// 监听列改变事件
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void numericUpDownCols_ValueChanged(object sender, EventArgs e)
        {
            int currentValue = (int)this.numericUpDownCols.Value;
            this.cols = Math.Min(Math.Max(1, currentValue), this.fullNameList.Count);
            this.numericUpDownCols.Value = this.cols;
            this.CalSpritesheetRows();
        }

        /// <summary>
        /// 根据雪碧图的列来结算雪碧图的行
        /// </summary>
        private void CalSpritesheetRows()
        {
            int count = this.fullNameList.Count;
            this.rows = (count % this.cols == 0) ? (count / this.cols) : (count / this.cols + 1);
            this.numericUpDownRows.Value = this.rows;
        }
    }
}
