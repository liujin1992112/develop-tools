namespace MapEditor.Forms
{
    partial class SpritesheetDialog
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.ButtonOpenFolder = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.textBoxDir = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.textBox1 = new System.Windows.Forms.TextBox();
            this.ButtonMake = new System.Windows.Forms.Button();
            this.label3 = new System.Windows.Forms.Label();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.numericUpDownRows = new System.Windows.Forms.NumericUpDown();
            this.numericUpDownCols = new System.Windows.Forms.NumericUpDown();
            this.numericUpDownUnitWidth = new System.Windows.Forms.NumericUpDown();
            this.numericUpDownUnitHeight = new System.Windows.Forms.NumericUpDown();
            this.groupBox1.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownRows)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownCols)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownUnitWidth)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownUnitHeight)).BeginInit();
            this.SuspendLayout();
            // 
            // ButtonOpenFolder
            // 
            this.ButtonOpenFolder.Location = new System.Drawing.Point(509, 21);
            this.ButtonOpenFolder.Name = "ButtonOpenFolder";
            this.ButtonOpenFolder.Size = new System.Drawing.Size(75, 23);
            this.ButtonOpenFolder.TabIndex = 0;
            this.ButtonOpenFolder.Text = "打开文件夹";
            this.ButtonOpenFolder.UseVisualStyleBackColor = true;
            this.ButtonOpenFolder.Click += new System.EventHandler(this.ButtonOpenFolder_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(48, 26);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(65, 12);
            this.label1.TabIndex = 1;
            this.label1.Text = "选择目录：";
            // 
            // textBoxDir
            // 
            this.textBoxDir.Location = new System.Drawing.Point(119, 23);
            this.textBoxDir.Name = "textBoxDir";
            this.textBoxDir.Size = new System.Drawing.Size(373, 21);
            this.textBoxDir.TabIndex = 2;
            this.textBoxDir.DragDrop += new System.Windows.Forms.DragEventHandler(this.textBoxDir_DragDrop);
            this.textBoxDir.DragEnter += new System.Windows.Forms.DragEventHandler(this.textBoxDir_DragEnter);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(48, 64);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(65, 12);
            this.label2.TabIndex = 3;
            this.label2.Text = "保存目录：";
            // 
            // textBox1
            // 
            this.textBox1.Location = new System.Drawing.Point(119, 61);
            this.textBox1.Name = "textBox1";
            this.textBox1.Size = new System.Drawing.Size(373, 21);
            this.textBox1.TabIndex = 4;
            // 
            // ButtonMake
            // 
            this.ButtonMake.Location = new System.Drawing.Point(339, 268);
            this.ButtonMake.Name = "ButtonMake";
            this.ButtonMake.Size = new System.Drawing.Size(75, 23);
            this.ButtonMake.TabIndex = 5;
            this.ButtonMake.Text = "制作雪碧图";
            this.ButtonMake.UseVisualStyleBackColor = true;
            this.ButtonMake.Click += new System.EventHandler(this.ButtonMake_Click);
            // 
            // label3
            // 
            this.label3.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(6, 28);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(89, 12);
            this.label3.TabIndex = 6;
            this.label3.Text = "雪碧图的行数：";
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.numericUpDownUnitHeight);
            this.groupBox1.Controls.Add(this.numericUpDownUnitWidth);
            this.groupBox1.Controls.Add(this.numericUpDownCols);
            this.groupBox1.Controls.Add(this.numericUpDownRows);
            this.groupBox1.Controls.Add(this.label6);
            this.groupBox1.Controls.Add(this.label5);
            this.groupBox1.Controls.Add(this.label4);
            this.groupBox1.Controls.Add(this.label3);
            this.groupBox1.Location = new System.Drawing.Point(50, 97);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(427, 118);
            this.groupBox1.TabIndex = 7;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "雪碧图配置信息";
            // 
            // label4
            // 
            this.label4.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(6, 59);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(89, 12);
            this.label4.TabIndex = 8;
            this.label4.Text = "雪碧图的列数：";
            // 
            // label5
            // 
            this.label5.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(242, 28);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(77, 12);
            this.label5.TabIndex = 10;
            this.label5.Text = "每一张宽度：";
            // 
            // label6
            // 
            this.label6.AccessibleRole = System.Windows.Forms.AccessibleRole.None;
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(242, 59);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(77, 12);
            this.label6.TabIndex = 12;
            this.label6.Text = "每一张高度：";
            // 
            // numericUpDownRows
            // 
            this.numericUpDownRows.Enabled = false;
            this.numericUpDownRows.Location = new System.Drawing.Point(101, 20);
            this.numericUpDownRows.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.numericUpDownRows.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.numericUpDownRows.Name = "numericUpDownRows";
            this.numericUpDownRows.Size = new System.Drawing.Size(71, 21);
            this.numericUpDownRows.TabIndex = 13;
            this.numericUpDownRows.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // numericUpDownCols
            // 
            this.numericUpDownCols.Location = new System.Drawing.Point(101, 50);
            this.numericUpDownCols.Maximum = new decimal(new int[] {
            1000,
            0,
            0,
            0});
            this.numericUpDownCols.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.numericUpDownCols.Name = "numericUpDownCols";
            this.numericUpDownCols.Size = new System.Drawing.Size(71, 21);
            this.numericUpDownCols.TabIndex = 14;
            this.numericUpDownCols.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // numericUpDownUnitWidth
            // 
            this.numericUpDownUnitWidth.Location = new System.Drawing.Point(325, 20);
            this.numericUpDownUnitWidth.Maximum = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            this.numericUpDownUnitWidth.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.numericUpDownUnitWidth.Name = "numericUpDownUnitWidth";
            this.numericUpDownUnitWidth.Size = new System.Drawing.Size(71, 21);
            this.numericUpDownUnitWidth.TabIndex = 15;
            this.numericUpDownUnitWidth.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // numericUpDownUnitHeight
            // 
            this.numericUpDownUnitHeight.Location = new System.Drawing.Point(325, 50);
            this.numericUpDownUnitHeight.Maximum = new decimal(new int[] {
            10000,
            0,
            0,
            0});
            this.numericUpDownUnitHeight.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
            this.numericUpDownUnitHeight.Name = "numericUpDownUnitHeight";
            this.numericUpDownUnitHeight.Size = new System.Drawing.Size(71, 21);
            this.numericUpDownUnitHeight.TabIndex = 16;
            this.numericUpDownUnitHeight.Value = new decimal(new int[] {
            1,
            0,
            0,
            0});
            // 
            // SpritesheetDialog
            // 
            this.AllowDrop = true;
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 12F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.ButtonMake);
            this.Controls.Add(this.textBox1);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.textBoxDir);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.ButtonOpenFolder);
            this.Name = "SpritesheetDialog";
            this.Text = "Spritesheet";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownRows)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownCols)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownUnitWidth)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.numericUpDownUnitHeight)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button ButtonOpenFolder;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox textBoxDir;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox textBox1;
        private System.Windows.Forms.Button ButtonMake;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.NumericUpDown numericUpDownRows;
        private System.Windows.Forms.NumericUpDown numericUpDownCols;
        private System.Windows.Forms.NumericUpDown numericUpDownUnitWidth;
        private System.Windows.Forms.NumericUpDown numericUpDownUnitHeight;
    }
}